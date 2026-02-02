(() => {
  const BAR_SELECTOR = '[data-battle-bar]';
  const HERO_SELECTOR = '[data-battle-hero]';
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

  class BattleStore {
    constructor(endpoint, pollMin, pollMax) {
      this.endpoint = endpoint;
      this.pollMin = pollMin;
      this.pollMax = pollMax;
      this.state = {
        sweetRevenue: 0,
        savouryRevenue: 0,
        lastUpdated: null,
        hasData: false,
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
          hasData: true,
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

  const getLeader = (sweetRevenue, savouryRevenue) => {
    if (sweetRevenue === savouryRevenue) return 'Tie';
    return sweetRevenue > savouryRevenue ? 'Sweet' : 'Savoury';
  };

  const getPercentages = (sweetRevenue, savouryRevenue) => {
    const total = sweetRevenue + savouryRevenue;
    if (total === 0) return { sweet: 50, savoury: 50 };
    const sweetPercent = Math.round((sweetRevenue / total) * 100);
    const savouryPercent = clamp(100 - sweetPercent, 0, 100);
    return { sweet: sweetPercent, savoury: savouryPercent };
  };

  class BattleBar {
    constructor(section) {
      this.section = section;
      this.endpoint = section.dataset.endpoint || '/battle-state.json';
      this.pollMin = toNumber(section.dataset.pollMin) || 10000;
      this.pollMax = toNumber(section.dataset.pollMax) || 30000;
      this.endDate = section.dataset.endDate ? new Date(section.dataset.endDate) : null;

      this.elements = {
        sweetBar: section.querySelector('[data-battle-sweet-bar]'),
        savouryBar: section.querySelector('[data-battle-savoury-bar]'),
        sweetPercent: section.querySelector('[data-battle-sweet-percent]'),
        savouryPercent: section.querySelector('[data-battle-savoury-percent]'),
        sweetStatus: section.querySelector('[data-battle-sweet-status]'),
        savouryStatus: section.querySelector('[data-battle-savoury-status]'),
        timer: section.querySelector('[data-battle-timer]'),
      };

      this.state = {
        sweetRevenue: 0,
        savouryRevenue: 0,
        lastUpdated: null,
        hasData: false,
      };

      this.countdownTimer = null;

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
        if (this.elements.timer) this.elements.timer.textContent = 'Battle over';
        if (this.countdownTimer) window.clearInterval(this.countdownTimer);
        return;
      }

      if (this.elements.timer) {
        this.elements.timer.textContent = formatDuration(remainingMs);
      }
    }

    updateUI() {
      const { sweetRevenue, savouryRevenue, hasData } = this.state;
      if (!hasData) {
        this.section.classList.add('is-loading');
        return;
      }

      this.section.classList.remove('is-loading');

      const leader = getLeader(sweetRevenue, savouryRevenue);
      const { sweet, savoury } = getPercentages(sweetRevenue, savouryRevenue);
      let barSweet = sweet;
      if (sweetRevenue > 0 && savouryRevenue > 0) {
        barSweet = clamp(sweet, 6, 94);
      }
      const barSavoury = 100 - barSweet;

      if (this.elements.sweetBar) this.elements.sweetBar.style.width = `${barSweet}%`;
      if (this.elements.savouryBar) this.elements.savouryBar.style.width = `${barSavoury}%`;
      if (this.elements.sweetPercent) this.elements.sweetPercent.textContent = `${sweet}%`;
      if (this.elements.savouryPercent) this.elements.savouryPercent.textContent = `${savoury}%`;

      if (this.elements.sweetStatus && this.elements.savouryStatus) {
        if (leader === 'Sweet') {
          this.elements.sweetStatus.textContent = 'Leading';
          this.elements.savouryStatus.textContent = 'Trailing';
        } else if (leader === 'Savoury') {
          this.elements.sweetStatus.textContent = 'Trailing';
          this.elements.savouryStatus.textContent = 'Leading';
        } else {
          this.elements.sweetStatus.textContent = 'Tied';
          this.elements.savouryStatus.textContent = 'Tied';
        }
      }
    }
  }

  class BattleHero {
    constructor(section) {
      this.section = section;
      this.endpoint = section.dataset.endpoint || '/battle-state.json';
      this.pollMin = toNumber(section.dataset.pollMin) || 10000;
      this.pollMax = toNumber(section.dataset.pollMax) || 30000;
      this.badges = Array.from(section.querySelectorAll('[data-battle-badge]'));
      this.cards = Array.from(section.querySelectorAll('[data-battle-team]'));

      const store = getStore({
        endpoint: this.endpoint,
        pollMin: this.pollMin,
        pollMax: this.pollMax,
      });

      store.subscribe((state) => {
        this.state = state;
        this.updateUI();
      });
    }

    updateUI() {
      const { sweetRevenue, savouryRevenue, hasData } = this.state;
      const { sweet, savoury } = getPercentages(sweetRevenue, savouryRevenue);
      const leader = getLeader(sweetRevenue, savouryRevenue);

      this.badges.forEach((badge) => {
        if (!badge.dataset.defaultText) {
          badge.dataset.defaultText = badge.textContent.trim();
        }

        if (!hasData) {
          badge.textContent = badge.dataset.defaultText;
          return;
        }

        const side = badge.dataset.battleBadge;
        const isLeader = (leader === 'Sweet' && side === 'sweet')
          || (leader === 'Savoury' && side === 'savoury');
        const label = leader === 'Tie' ? 'Tied' : (isLeader ? 'Winning' : 'Trailing');
        const percent = side === 'sweet' ? sweet : savoury;
        badge.textContent = `${label} - ${percent}%`;
      });

      this.cards.forEach((card) => {
        const side = card.dataset.battleTeam;
        card.classList.remove('is-leading');
        if (leader === 'Sweet' && side === 'sweet') card.classList.add('is-leading');
        if (leader === 'Savoury' && side === 'savoury') card.classList.add('is-leading');
      });
    }
  }

  document.querySelectorAll(BAR_SELECTOR).forEach((section) => {
    new BattleBar(section);
  });

  document.querySelectorAll(HERO_SELECTOR).forEach((section) => {
    new BattleHero(section);
  });
})();
