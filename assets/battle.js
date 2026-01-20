(() => {
  const SELECTOR = '[data-battle-hero]';

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
      return `\\u00a3${rounded.toLocaleString()}`;
    }
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

      this.elements = {
        bar: section.querySelector('[data-battle-bar]'),
        sweetPercent: section.querySelector('[data-battle-sweet-percent]'),
        savouryPercent: section.querySelector('[data-battle-savoury-percent]'),
        sweetRevenue: section.querySelectorAll('[data-battle-sweet-revenue]'),
        savouryRevenue: section.querySelectorAll('[data-battle-savoury-revenue]'),
        headline: section.querySelector('[data-battle-headline]'),
        countdown: section.querySelector('[data-battle-countdown]'),
        ticker: section.querySelector('[data-battle-ticker]'),
        lock: section.querySelector('[data-battle-lock]'),
        winner: section.querySelector('[data-battle-winner]'),
      };

      this.state = {
        sweetRevenue: 0,
        savouryRevenue: 0,
        lastUpdated: null,
      };

      this.tickerIndex = 0;
      this.tickerTimer = null;
      this.pollTimer = null;
      this.countdownTimer = null;
      this.isLocked = false;

      this.init();
    }

    init() {
      this.updateUI();
      this.fetchState();
      this.startCountdown();
    }

    async fetchState() {
      if (this.isLocked) return;

      // The /battle-state.json datastore should be updated by Shopify order webhooks.
      // TikTok Shop orders should feed into the same datastore to keep totals unified.
      try {
        const response = await fetch(this.endpoint, {
          headers: { Accept: 'application/json' },
          cache: 'no-store',
        });

        if (!response.ok) throw new Error(`Battle state request failed: ${response.status}`);
        const data = await response.json();

        this.state.sweetRevenue = clamp(toNumber(data.sweetRevenue), 0, Number.MAX_SAFE_INTEGER);
        this.state.savouryRevenue = clamp(toNumber(data.savouryRevenue), 0, Number.MAX_SAFE_INTEGER);
        this.state.lastUpdated = data.lastUpdated ? new Date(data.lastUpdated) : new Date();

        this.updateUI();
      } catch (error) {
        console.warn('[battle] Failed to load battle state', error);
      } finally {
        this.scheduleNextPoll();
      }
    }

    scheduleNextPoll() {
      if (this.isLocked) return;
      if (this.pollTimer) window.clearTimeout(this.pollTimer);
      const min = Math.min(this.pollMin, this.pollMax);
      const max = Math.max(this.pollMin, this.pollMax);
      const delay = Math.floor(Math.random() * (max - min + 1) + min);
      this.pollTimer = window.setTimeout(() => this.fetchState(), delay);
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
      if (this.pollTimer) window.clearTimeout(this.pollTimer);
      if (this.countdownTimer) window.clearInterval(this.countdownTimer);
      if (this.tickerTimer) window.clearInterval(this.tickerTimer);

      const winner = this.getLeader();
      if (this.elements.winner) {
        this.elements.winner.textContent = winner === 'Tie' ? 'Tie' : winner;
      }
      if (this.elements.lock) {
        this.elements.lock.hidden = false;
      }

      this.section.classList.add('is-locked');
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

    getLeadDifference() {
      const { sweetRevenue, savouryRevenue } = this.state;
      return Math.abs(sweetRevenue - savouryRevenue);
    }

    getTimeSinceUpdate() {
      if (!this.state.lastUpdated) return 0;
      const now = Date.now();
      return Math.max(0, Math.floor((now - this.state.lastUpdated.getTime()) / 1000));
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

      this.section.classList.remove('is-leading-sweet', 'is-leading-savoury');
      if (leader === 'Sweet') this.section.classList.add('is-leading-sweet');
      if (leader === 'Savoury') this.section.classList.add('is-leading-savoury');

      this.updateTicker();
    }

    buildTickerMessages() {
      const leader = this.getLeader();
      const diff = this.getLeadDifference();
      const timeSince = this.getTimeSinceUpdate();
      const diffFormatted = formatCurrency(diff, this.locale, this.currency);

      let leadMessage = 'Battle is tied.';
      if (leader === 'Sweet') leadMessage = `Sweet leads by ${diffFormatted}`;
      if (leader === 'Savoury') leadMessage = `Savoury leads by ${diffFormatted}`;

      let gapMessage = 'Score still shifting.';
      if (leader === 'Sweet') gapMessage = 'Savoury closing the gap.';
      if (leader === 'Savoury') gapMessage = 'Sweet closing the gap.';

      const updatedMessage = `Updated ${timeSince}s ago`;

      return [leadMessage, gapMessage, updatedMessage];
    }

    updateTicker() {
      if (!this.elements.ticker || this.isLocked) return;
      const messages = this.buildTickerMessages();
      this.elements.ticker.textContent = messages[this.tickerIndex % messages.length];

      if (!this.tickerTimer) {
        this.tickerTimer = window.setInterval(() => {
          this.tickerIndex = (this.tickerIndex + 1) % messages.length;
          this.updateTicker();
        }, 3500);
      }
    }
  }

  document.querySelectorAll(SELECTOR).forEach((section) => {
    new BattleHero(section);
  });
})();
