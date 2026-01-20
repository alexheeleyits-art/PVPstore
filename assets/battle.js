(() => {
  const HERO_SELECTOR = '[data-battle-hero]';
  const ANNOUNCEMENT_SELECTOR = '[data-battle-announcement]';
  const stores = new Map();

  const toNumber = (value) => {
    if (typeof value === 'number') return value;
    if (typeof value === 'string') return Number(value.replace(/,/g, ''));
    return 0;
  };

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const formatDuration = (ms) => {
    const totalSeconds = Math.max(0, Math.floor(ms / 1000));
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m ${seconds}s`;
    return `${seconds}s`;
  };

  const formatCurrency = (value, locale, currency) => {
    const safeValue = Number.isFinite(value) ? value : 0;
    try {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        maximumFractionDigits: 0,
      }).format(safeValue);
    } catch (error) {
      const rounded = Math.round(safeValue);
      return `\u00a3${rounded.toLocaleString()}`;
    }
  };

  class BattleStore {
    constructor(endpoint, pollMin, pollMax) {
      this.endpoint = endpoint;
      this.pollMin = pollMin;
      this.pollMax = pollMax;
      this.state = {
        sweetRevenue: 0,
        savouryRevenue: 0,
        lastUpdated: null,
      };
      this.subscribers = new Set();
      this.started = false;
      this.pollTimer = null;
    }

    updatePolling(pollMin, pollMax) {
      const min = Math.min(pollMin, pollMax);
      const max = Math.max(pollMin, pollMax);
      this.pollMin = Math.min(this.pollMin, min);
      this.pollMax = Math.min(this.pollMax, max);
      if (this.pollMax < this.pollMin) this.pollMax = this.pollMin;
    }

    subscribe(callback) {
      this.subscribers.add(callback);
      callback(this.state);
      this.start();
      return () => this.subscribers.delete(callback);
    }

    start() {
      if (this.started) return;
      this.started = true;
      this.fetchState();
    }

    notify() {
      this.subscribers.forEach((callback) => callback(this.state));
    }

    async fetchState() {
      // The /battle-state.json datastore should be updated by Shopify order webhooks.
      // TikTok Shop orders should feed into the same datastore to keep totals unified.
      try {
        const response = await fetch(this.endpoint, {
          headers: { Accept: 'application/json' },
          cache: 'no-store',
        });

        if (!response.ok) throw new Error(`Battle state request failed: ${response.status}`);
        const data = await response.json();

        this.state = {
          sweetRevenue: clamp(toNumber(data.sweetRevenue), 0, Number.MAX_SAFE_INTEGER),
          savouryRevenue: clamp(toNumber(data.savouryRevenue), 0, Number.MAX_SAFE_INTEGER),
          lastUpdated: data.lastUpdated ? new Date(data.lastUpdated) : new Date(),
        };

        this.notify();
      } catch (error) {
        console.warn('[battle] Failed to load battle state', error);
      } finally {
        this.scheduleNextPoll();
      }
    }

    scheduleNextPoll() {
      if (this.pollTimer) window.clearTimeout(this.pollTimer);
      const min = Math.min(this.pollMin, this.pollMax);
      const max = Math.max(this.pollMin, this.pollMax);
      const delay = Math.floor(Math.random() * (max - min + 1) + min);
      this.pollTimer = window.setTimeout(() => this.fetchState(), delay);
    }
  }

  const getStore = ({ endpoint, pollMin, pollMax }) => {
    const key = endpoint;
    if (!stores.has(key)) {
      stores.set(key, new BattleStore(endpoint, pollMin, pollMax));
    } else {
      stores.get(key).updatePolling(pollMin, pollMax);
    }
    return stores.get(key);
  };

  class BattleHero {
    constructor(section) {
      this.section = section;
      this.endpoint = section.dataset.endpoint || '/battle-state.json';
      this.pollMin = toNumber(section.dataset.pollMin) || 10000;
      this.pollMax = toNumber(section.dataset.pollMax) || 30000;
      this.locale = section.dataset.locale || navigator.language || 'en-GB';
      this.currency = section.dataset.currency || 'GBP';
      this.endDate = section.dataset.endDate ? new Date(section.dataset.endDate) : null;
      this.sweetName = section.dataset.sweetName || 'Sweet';
      this.savouryName = section.dataset.savouryName || 'Savoury';
      this.sweetShort = this.sweetName.replace(/^Team\\s+/i, '').trim() || 'Sweet';
      this.savouryShort = this.savouryName.replace(/^Team\\s+/i, '').trim() || 'Savoury';

      this.elements = {
        bar: section.querySelector('[data-battle-bar]'),
        sweetPercent: section.querySelector('[data-battle-sweet-percent]'),
        savouryPercent: section.querySelector('[data-battle-savoury-percent]'),
        sweetRevenue: section.querySelectorAll('[data-battle-sweet-revenue]'),
        savouryRevenue: section.querySelectorAll('[data-battle-savoury-revenue]'),
        headline: section.querySelector('[data-battle-headline]'),
        countdown: section.querySelector('[data-battle-countdown]'),
        lock: section.querySelector('[data-battle-lock]'),
        winner: section.querySelector('[data-battle-winner]'),
        sweetStatus: section.querySelector('[data-battle-sweet-status]'),
        savouryStatus: section.querySelector('[data-battle-savoury-status]'),
      };

      this.state = {
        sweetRevenue: 0,
        savouryRevenue: 0,
        lastUpdated: null,
      };

      this.countdownTimer = null;
      this.isLocked = false;

      const store = getStore({
        endpoint: this.endpoint,
        pollMin: this.pollMin,
        pollMax: this.pollMax,
      });

      store.subscribe((state) => {
        this.state = state;
        this.updateUI();
      });

      this.startCountdown();
    }

    startCountdown() {
      if (!this.endDate || Number.isNaN(this.endDate.getTime())) return;
      this.tickCountdown();
      this.countdownTimer = window.setInterval(() => this.tickCountdown(), 1000);
    }

    tickCountdown() {
      if (!this.endDate || Number.isNaN(this.endDate.getTime())) return;
      const now = new Date();
      const remainingMs = this.endDate.getTime() - now.getTime();

      if (remainingMs <= 0) {
        this.lockBattle();
        return;
      }

      if (this.elements.countdown) {
        this.elements.countdown.textContent = `Ends in ${formatDuration(remainingMs)}`;
      }
    }

    lockBattle() {
      if (this.isLocked) return;
      this.isLocked = true;
      if (this.countdownTimer) window.clearInterval(this.countdownTimer);

      this.updateWinner();

      if (this.elements.lock) {
        this.elements.lock.hidden = false;
      }

      this.section.classList.add('is-locked');
    }

    updateWinner() {
      const winner = this.getLeader();
      if (this.elements.winner) {
        this.elements.winner.textContent = winner === 'Tie' ? 'Tie' : winner;
      }
    }

    getLeader() {
      const { sweetRevenue, savouryRevenue } = this.state;
      if (sweetRevenue === savouryRevenue) return 'Tie';
      return sweetRevenue > savouryRevenue ? 'Sweet' : 'Savoury';
    }

    getPercentages() {
      const { sweetRevenue, savouryRevenue } = this.state;
      const total = sweetRevenue + savouryRevenue;
      if (total === 0) return { sweet: 50, savoury: 50 };
      const sweetPercent = Math.round((sweetRevenue / total) * 100);
      const savouryPercent = clamp(100 - sweetPercent, 0, 100);
      return { sweet: sweetPercent, savoury: savouryPercent };
    }

    updateUI() {
      const { sweetRevenue, savouryRevenue } = this.state;
      const leader = this.getLeader();
      const { sweet, savoury } = this.getPercentages();

      if (this.elements.bar) {
        this.elements.bar.style.width = `${sweet}%`;
        const barWrapper = this.elements.bar.closest('[role="progressbar"]');
        if (barWrapper) barWrapper.setAttribute('aria-valuenow', `${sweet}`);
      }

      if (this.elements.sweetPercent) this.elements.sweetPercent.textContent = `${sweet}%`;
      if (this.elements.savouryPercent) this.elements.savouryPercent.textContent = `${savoury}%`;

      const formattedSweet = formatCurrency(sweetRevenue, this.locale, this.currency);
      const formattedSavoury = formatCurrency(savouryRevenue, this.locale, this.currency);

      this.elements.sweetRevenue.forEach((el) => {
        el.textContent = formattedSweet;
      });

      this.elements.savouryRevenue.forEach((el) => {
        el.textContent = formattedSavoury;
      });

      if (this.elements.headline) {
        if (leader === 'Tie') {
          this.elements.headline.textContent = 'Dead heat - no leader yet.';
        } else {
          this.elements.headline.textContent = `${leader} just took the lead!`;
        }
      }

      if (this.elements.sweetStatus && this.elements.savouryStatus) {
        if (leader === 'Sweet') {
          this.elements.sweetStatus.textContent = `${this.sweetShort} takes the lead`;
          this.elements.savouryStatus.textContent = `${this.savouryShort} fighting back`;
        } else if (leader === 'Savoury') {
          this.elements.sweetStatus.textContent = `${this.sweetShort} fighting back`;
          this.elements.savouryStatus.textContent = `${this.savouryShort} takes the lead`;
        } else {
          this.elements.sweetStatus.textContent = 'Neck and neck';
          this.elements.savouryStatus.textContent = 'Neck and neck';
        }
      }

      this.section.classList.remove('is-leading-sweet', 'is-leading-savoury');
      if (leader === 'Sweet') this.section.classList.add('is-leading-sweet');
      if (leader === 'Savoury') this.section.classList.add('is-leading-savoury');

      if (this.elements.lock) {
        this.elements.lock.hidden = !this.isLocked;
      }

      if (this.isLocked) {
        this.updateWinner();
      }
    }
  }

  class BattleAnnouncement {
    constructor(section) {
      this.section = section;
      this.endpoint = section.dataset.endpoint || '/battle-state.json';
      this.pollMin = toNumber(section.dataset.pollMin) || 10000;
      this.pollMax = toNumber(section.dataset.pollMax) || 30000;
      this.locale = section.dataset.locale || navigator.language || 'en-GB';
      this.currency = section.dataset.currency || 'GBP';

      this.ticker = section.querySelector('[data-battle-ticker]');
      this.state = {
        sweetRevenue: 0,
        savouryRevenue: 0,
        lastUpdated: null,
      };
      this.tickerIndex = 0;
      this.tickerTimer = null;

      const store = getStore({
        endpoint: this.endpoint,
        pollMin: this.pollMin,
        pollMax: this.pollMax,
      });

      store.subscribe((state) => {
        this.state = state;
        this.updateTicker();
      });
    }

    getLeader() {
      const { sweetRevenue, savouryRevenue } = this.state;
      if (sweetRevenue === savouryRevenue) return 'Tie';
      return sweetRevenue > savouryRevenue ? 'Sweet' : 'Savoury';
    }

    getLeadDifference() {
      const { sweetRevenue, savouryRevenue } = this.state;
      return Math.abs(sweetRevenue - savouryRevenue);
    }

    getLeadPercent() {
      const { sweetRevenue, savouryRevenue } = this.state;
      const total = sweetRevenue + savouryRevenue;
      if (total === 0) return 0;
      return Math.round((Math.abs(sweetRevenue - savouryRevenue) / total) * 100);
    }

    getTimeSinceUpdate() {
      if (!this.state.lastUpdated) return 0;
      const now = Date.now();
      return Math.max(0, Math.floor((now - this.state.lastUpdated.getTime()) / 1000));
    }

    buildTickerMessages() {
      const leader = this.getLeader();
      const diffPercent = this.getLeadPercent();
      const timeSince = this.getTimeSinceUpdate();

      let leadMessage = 'Battle is tied.';
      if (leader === 'Sweet') leadMessage = `Sweet leads by ${diffPercent}%`;
      if (leader === 'Savoury') leadMessage = `Savoury leads by ${diffPercent}%`;

      let gapMessage = 'Score still shifting.';
      if (leader === 'Sweet') gapMessage = 'Savoury closing the gap.';
      if (leader === 'Savoury') gapMessage = 'Sweet closing the gap.';

      const updatedMessage = `Updated ${timeSince}s ago`;

      return [leadMessage, gapMessage, updatedMessage];
    }

    updateTicker() {
      if (!this.ticker) return;
      const messages = this.buildTickerMessages();
      this.ticker.textContent = messages[this.tickerIndex % messages.length];

      if (!this.tickerTimer) {
        this.tickerTimer = window.setInterval(() => {
          this.tickerIndex = (this.tickerIndex + 1) % messages.length;
          this.updateTicker();
        }, 3500);
      }
    }
  }

  document.querySelectorAll(HERO_SELECTOR).forEach((section) => {
    new BattleHero(section);
  });

  document.querySelectorAll(ANNOUNCEMENT_SELECTOR).forEach((section) => {
    new BattleAnnouncement(section);
  });
})();
