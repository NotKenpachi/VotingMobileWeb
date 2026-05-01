/* ─────────────────────────────────────────────────────────────────
   YES or NO? — App Logic

   Mobile Web Technologies used:
     1. Web App Manifest + Service Worker  →  PWA (installable, offline)
     2. Vibration API                      →  haptic feedback on each vote
     3. Touch Events API                   →  swipe left/right to vote
   ──────────────────────────────────────────────────────────────── */

// ── 100 QUESTIONS ────────────────────────────────────────────────
const QUESTIONS = [
  "Would you take $5 million if it meant permanently losing your left hand?",
  "Would you become famous if it meant losing all your privacy forever?",
  "Would you live forever if you could never leave your home country?",
  "Would you know the exact date of your death even though you could not change it?",
  "Would you give up all social media permanently for $10,000?",
  "Would you trade 5 years off your life to be exceptionally attractive?",
  "Would you be able to read minds if everyone could also read yours?",
  "Would you give up your favorite food forever to receive $1 million?",
  "Would you swap bodies with your worst enemy for one full year?",
  "Would you take a pill that made you 30% smarter if it permanently dulled your emotions?",
  "Would you accept $1 million cash if you had to spend every cent within 24 hours?",
  "Would you give up the internet for the rest of your life for $50,000 per year?",
  "Would you gain the ability to fly if it meant you could never ride in any vehicle again?",
  "Would you go back in time to relive your childhood with all the knowledge you have today?",
  "Would you erase a painful memory if doing so also erased everything you learned from it?",
  "Would you become the world's greatest musician if no one else could ever appreciate your music?",
  "Would you accept guaranteed career success if it meant all your close relationships would fail?",
  "Would you never need sleep again if the extra hours gave you no additional energy?",
  "Would you spend an entire year alone on a deserted island for $500,000?",
  "Would you take a job you love paying $30,000 per year over a job you hate paying $300,000?",
  "Would you be able to know anyone's thoughts by touching them if you could never turn it off?",
  "Would you give up your sense of taste permanently in exchange for guaranteed perfect health?",
  "Would you accept a life of luxury if it required living a complete lie to everyone you know?",
  "Would you let a doctor tell you your exact IQ score if you could never un-know it?",
  "Would you trade places with the richest person in the world for exactly one year?",
  "Would you keep a secret that could save lives if telling it would destroy your reputation?",
  "Would you live in a world without music if it were the price to cure all disease?",
  "Would you gain the ability to speak every language if you permanently lost the ability to write?",
  "Would you donate one of your kidneys to a stranger in exchange for $200,000?",
  "Would you age at half the normal rate if your emotional maturity was permanently frozen too?",
  "Would you take a guaranteed $100,000 today over a coin flip for $1,000,000?",
  "Would you give up all alcohol forever in exchange for $1,000 added to your income monthly?",
  "Would you choose to live your life over from birth with your current memories intact?",
  "Would you become invisible for one day if you could never tell anyone what you witnessed?",
  "Would you give up movies and television forever in exchange for perfect mental health?",
  "Would you know the death date of everyone you love even though you could never warn them?",
  "Would you accept $10 million today if it permanently turned your best friend into your enemy?",
  "Would you switch careers immediately even if it meant starting at the very bottom from scratch?",
  "Would you eat the exact same meal every day for life in exchange for $3,000 extra per month?",
  "Would you have a photographic memory if it also meant you could never forget any painful moment?",
  "Would you give up your smartphone for a full year in exchange for $20,000?",
  "Would you gain the ability to teleport instantly if it meant you could never use any other transport?",
  "Would you sacrifice all your personal privacy if it guaranteed your complete safety from crime?",
  "Would you choose to age backwards from 80 to 0 instead of living a normal forward life?",
  "Would you take $500,000 cash if it meant you could never permanently leave the city you live in now?",
  "Would you accept immortality knowing everyone you ever loved would eventually die without you?",
  "Would you always know whether your romantic partner was being faithful to you?",
  "Would you give up all your current savings for a guaranteed $2 million to arrive in 10 years?",
  "Would you skip your own wedding to spend that day with a stranger who desperately needed help?",
  "Would you give up all your ambitions and dreams for a guaranteed comfortable and stress-free life?",
  "Would you live in a world where everyone was completely honest with each other at all times?",
  "Would you take a pill that eliminated all jealousy from your life if it also eliminated all ambition?",
  "Would you trade 10 years of your memories to gain 10 additional years of life?",
  "Would you publish your complete browser history publicly for $100,000?",
  "Would you live in a world with no government or laws if it also meant no protection from anyone?",
  "Would you tell a painful truth to someone you deeply love even if it might end the relationship?",
  "Would you work a job you are passionate about even if it paid only minimum wage?",
  "Would you give away every physical possession you own for one full year in exchange for inner peace?",
  "Would you travel the world solo for 3 years if it meant missing every major event back home?",
  "Would you accept guaranteed good health for life if you could never eat junk food or sweets again?",
  "Would you give up your ability to dream during sleep in exchange for $50,000?",
  "Would you let a complete stranger read your personal diary for $10,000?",
  "Would you take a drug that made you completely fearless if its long-term effects were entirely unknown?",
  "Would you move to a new country entirely alone if it guaranteed a significantly better quality of life?",
  "Would you relocate permanently to the 1950s if you were allowed to keep all your current knowledge?",
  "Would you be the smartest person in every room if it meant no one around you could ever keep up?",
  "Would you give up the ability to fall in love if it also meant you could never experience heartbreak?",
  "Would you work 80-hour weeks for exactly 5 years if it guaranteed complete financial freedom afterward?",
  "Would you permanently stop eating all sugar and desserts for an extra $500 added to your income monthly?",
  "Would you accept a free house if it was in a city you didn't choose and you could never sell it?",
  "Would you take a full gap year with no plan and no savings to simply figure out your life?",
  "Would you tell your employer your completely honest opinion of them if you received $5,000 to do so?",
  "Would you become the most physically attractive person you know if it made everyone around you envious?",
  "Would you give $1,000 of your own money to a homeless stranger if you were certain it would change their life?",
  "Would you publicly admit you were completely wrong about something important to resolve a major conflict?",
  "Would you permanently stop eating all meat if it scientifically added 3 years to your lifespan?",
  "Would you delete every social media account you own today and never return if it improved your mental health?",
  "Would you swap salaries with the person you envy most for exactly one year?",
  "Would you undergo surgery to upgrade your memory to near-perfect recall?",
  "Would you give up all caffeine forever for an extra $200 added to your monthly income?",
  "Would you end a long-term friendship if you discovered the person had been lying to you for years?",
  "Would you allow your government to track your every movement in exchange for guaranteed safety?",
  "Would you lose your sense of smell permanently if your other four senses doubled in intensity?",
  "Would you quit your job today to pursue your true passion even if failure was the most likely outcome?",
  "Would you accept a life where you could form no new memories but kept every memory you already have?",
  "Would you spend 30 days in complete solitary confinement for $200,000?",
  "Would you allow a machine to make every decision in your life if it always chose the optimal outcome?",
  "Would you commit to speaking only the truth for the rest of your life even if it cost you relationships?",
  "Would you give up owning a car permanently if public transportation was free and instant everywhere?",
  "Would you accept $1 million today if it meant every person in your family believed you had died?",
  "Would you go completely offline — no internet, no phone — for 6 full months in exchange for $100,000?",
  "Would you choose to live in a simulation if the experience was completely indistinguishable from real life?",
  "Would you permanently increase your pain tolerance if it equally reduced your capacity to feel pleasure?",
  "Would you press a button that gave everyone on Earth equal wealth if it reset your own savings to zero?",
  "Would you give up your right to vote in every future election in exchange for $50,000?",
  "Would you accept guaranteed fame and recognition in your field if your personal life was a total failure?",
  "Would you let a researcher publish a study about your deepest insecurities and fears for $30,000?",
  "Would you spend one year living as the opposite gender if it gave you a radically new perspective on life?",
  "Would you choose to see a five-minute glimpse of your own future exactly once, never to be repeated?",
  "Would you live the rest of your life fully aware that nothing you do will ultimately matter in 1,000 years?",
];

// ── LOCAL STORAGE ─────────────────────────────────────────────────
const Storage = {
  VOTES_KEY: 'yesno_votes',
  INDEX_KEY: 'yesno_index',

  load() {
    try {
      const votes = JSON.parse(localStorage.getItem(this.VOTES_KEY) || '{}');
      const index = parseInt(localStorage.getItem(this.INDEX_KEY) || '0', 10);
      return { votes, index: isNaN(index) ? 0 : index };
    } catch {
      return { votes: {}, index: 0 };
    }
  },

  save(votes, index) {
    localStorage.setItem(this.VOTES_KEY, JSON.stringify(votes));
    localStorage.setItem(this.INDEX_KEY, String(index));
  },

  reset() {
    localStorage.removeItem(this.VOTES_KEY);
    localStorage.removeItem(this.INDEX_KEY);
  },
};

// ── APP ───────────────────────────────────────────────────────────
const App = {
  votes: {},        // { questionIndex: 'yes' | 'no' | 'skip' }
  currentIndex: 0,

  // ── Init ───────────────────────────────────────────────────────
  init() {
    const saved = Storage.load();
    this.votes = saved.votes;
    this.currentIndex = saved.index;

    this._on('btn-start',        () => this.startVoting());
    this._on('btn-view-results', () => this.showResults());
    this._on('btn-yes',          () => this.vote('yes'));
    this._on('btn-no',           () => this.vote('no'));
    this._on('btn-skip',         () => this.vote('skip'));
    this._on('btn-nav-results',  () => this.showResults());
    this._on('btn-continue',     () => this.startVoting());
    this._on('btn-reset',        () => this.reset());
    this._on('btn-home',         () => this.showScreen('screen-start'));

    // ── Mobile Web Tech #3: Touch Events / Swipe Gestures
    this.setupSwipe();

    this.updateStartScreen();
    this.showScreen('screen-start');
  },

  _on(id, handler) {
    document.getElementById(id).addEventListener('click', handler);
  },

  // ── Screen navigation ──────────────────────────────────────────
  showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
  },

  // ── Start screen ──────────────────────────────────────────────
  updateStartScreen() {
    const answered = Object.keys(this.votes).length;
    const statusEl = document.getElementById('start-status');
    const startBtn = document.getElementById('btn-start');

    if (answered === 0) {
      statusEl.textContent  = '';
      startBtn.textContent  = 'Start Voting';
      startBtn.disabled     = false;
    } else if (answered >= QUESTIONS.length) {
      statusEl.textContent  = 'All 100 questions answered!';
      startBtn.textContent  = 'All Done';
      startBtn.disabled     = true;
    } else {
      statusEl.textContent  = `${answered} of ${QUESTIONS.length} answered`;
      startBtn.textContent  = `Continue (${QUESTIONS.length - answered} left)`;
      startBtn.disabled     = false;
    }
  },

  // ── Voting ─────────────────────────────────────────────────────
  startVoting() {
    this.currentIndex = 0;
    while (
      this.currentIndex < QUESTIONS.length &&
      this.votes[this.currentIndex] !== undefined
    ) {
      this.currentIndex++;
    }

    if (this.currentIndex >= QUESTIONS.length) {
      this.showResults();
      return;
    }

    this.renderQuestion(false);
    this.showScreen('screen-vote');
  },

  renderQuestion(animate) {
    const total    = QUESTIONS.length;
    const answered = Object.keys(this.votes).length;

    document.getElementById('q-answered').textContent           = answered;
    document.getElementById('q-total').textContent              = total;
    document.getElementById('progress-fill').style.width        = `${(answered / total) * 100}%`;

    const card = document.getElementById('question-card');

    // Clear any inline transform/opacity left by a swipe gesture
    card.style.transform  = '';
    card.style.opacity    = '';
    card.style.transition = '';

    if (animate) {
      card.classList.add('anim-enter');
      card.addEventListener('animationend', () => card.classList.remove('anim-enter'), { once: true });
    }

    document.getElementById('question-text').textContent = QUESTIONS[this.currentIndex];
  },

  vote(answer, fromSwipe = false) {
    // ── Mobile Web Tech #2: Vibration API
    // Single pulse for YES, double pulse for NO, brief tick for Skip
    if ('vibrate' in navigator) {
      if      (answer === 'yes')  navigator.vibrate(60);
      else if (answer === 'no')   navigator.vibrate([50, 30, 50]);
      else                        navigator.vibrate(20);
    }

    // Hide the swipe hint after the first interaction
    const hint = document.getElementById('swipe-hint');
    if (hint) hint.classList.add('hidden');

    this.votes[this.currentIndex] = answer;

    let next = this.currentIndex + 1;
    while (next < QUESTIONS.length && this.votes[next] !== undefined) {
      next++;
    }

    Storage.save(this.votes, next);

    // Screen background flash
    if (answer !== 'skip') {
      const screen = document.getElementById('screen-vote');
      screen.classList.add(answer === 'yes' ? 'flash-yes' : 'flash-no');
      screen.addEventListener('animationend', () => {
        screen.classList.remove('flash-yes', 'flash-no');
      }, { once: true });
    }

    const proceed = () => {
      this.currentIndex = next;
      if (this.currentIndex >= QUESTIONS.length) {
        this.showResults();
        return;
      }
      this.renderQuestion(true);
    };

    if (fromSwipe) {
      // The swipe handler already animated the card off screen — just load next
      setTimeout(proceed, 60);
      return;
    }

    // Button-tap: CSS exit animation
    const card      = document.getElementById('question-card');
    const exitClass = `anim-exit-${answer}`;
    card.classList.add(exitClass);
    card.addEventListener('animationend', () => {
      card.classList.remove(exitClass);
      proceed();
    }, { once: true });
  },

  // ── Mobile Web Tech #3: Touch Events API — Swipe to vote ───────
  setupSwipe() {
    const card   = document.getElementById('question-card');
    const indYes = document.getElementById('indicator-yes');
    const indNo  = document.getElementById('indicator-no');

    let startX = 0, startY = 0, dragging = false;

    // Record finger-down position
    card.addEventListener('touchstart', e => {
      startX   = e.touches[0].clientX;
      startY   = e.touches[0].clientY;
      dragging = true;
      card.style.transition = 'none'; // disable CSS transitions while dragging
    }, { passive: true });

    // Drag the card and reveal the YES/NO label
    card.addEventListener('touchmove', e => {
      if (!dragging) return;

      const dx = e.touches[0].clientX - startX;
      const dy = e.touches[0].clientY - startY;

      // Ignore mostly-vertical movement (let the page scroll)
      if (Math.abs(dy) > Math.abs(dx) * 1.4) return;

      const rotate = dx / 18; // subtle tilt follows the drag
      card.style.transform = `translateX(${dx * 0.45}px) rotate(${rotate}deg)`;

      // Fade in the matching label as swipe distance grows
      const strength   = Math.min(Math.abs(dx) / 80, 1);
      indYes.style.opacity = dx > 20  ? strength : 0;
      indNo.style.opacity  = dx < -20 ? strength : 0;
    }, { passive: true });

    // On finger-up: commit if past threshold, otherwise snap back
    card.addEventListener('touchend', e => {
      if (!dragging) return;
      dragging = false;

      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;

      // Reset direction labels
      indYes.style.opacity = 0;
      indNo.style.opacity  = 0;

      // 80px threshold; swipe must be more horizontal than vertical
      if (Math.abs(dx) >= 80 && Math.abs(dx) > Math.abs(dy)) {
        const answer    = dx > 0 ? 'yes' : 'no';
        const direction = dx > 0 ? 1 : -1;

        // Fly the card off screen in the swipe direction
        card.style.transition = 'transform 0.25s ease-in, opacity 0.2s ease-in';
        card.style.transform  = `translateX(${direction * (window.innerWidth + 100)}px) rotate(${direction * 22}deg)`;
        card.style.opacity    = '0';

        // Pass fromSwipe=true so vote() skips its own CSS exit animation
        this.vote(answer, true);
      } else {
        // Not far enough — spring back to center
        card.style.transition = 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)';
        card.style.transform  = '';
        card.addEventListener('transitionend', () => {
          card.style.transition = '';
        }, { once: true });
      }
    }, { passive: true });
  },

  // ── Results ────────────────────────────────────────────────────
  showResults() {
    const yesList = document.getElementById('yes-list');
    const noList  = document.getElementById('no-list');
    yesList.innerHTML = '';
    noList.innerHTML  = '';

    let yesCount = 0, noCount = 0, skipCount = 0;

    for (let i = 0; i < QUESTIONS.length; i++) {
      const answer = this.votes[i];
      if (!answer) continue;

      if (answer === 'yes') {
        this._appendItem(yesList, QUESTIONS[i]);
        yesCount++;
      } else if (answer === 'no') {
        this._appendItem(noList, QUESTIONS[i]);
        noCount++;
      } else {
        skipCount++;
      }
    }

    if (yesCount === 0) this._appendEmpty(yesList, 'No YES answers yet.');
    if (noCount  === 0) this._appendEmpty(noList,  'No NO answers yet.');

    document.getElementById('tally-yes-count').textContent  = yesCount;
    document.getElementById('tally-no-count').textContent   = noCount;
    document.getElementById('tally-skip-count').textContent = skipCount;

    const remaining = QUESTIONS.length - Object.keys(this.votes).length;
    const remEl     = document.getElementById('results-remaining');
    const contBtn   = document.getElementById('btn-continue');

    if (remaining > 0) {
      remEl.textContent   = `${remaining} question${remaining !== 1 ? 's' : ''} remaining`;
      contBtn.textContent = 'Continue Voting';
      contBtn.disabled    = false;
    } else {
      remEl.textContent   = 'All questions answered!';
      contBtn.textContent = 'All Done';
      contBtn.disabled    = true;
    }

    this.showScreen('screen-results');
  },

  _appendItem(list, text) {
    const li = document.createElement('li');
    li.textContent = text;
    list.appendChild(li);
  },

  _appendEmpty(list, text) {
    const li = document.createElement('li');
    li.className   = 'empty';
    li.textContent = text;
    list.appendChild(li);
  },

  // ── Reset ──────────────────────────────────────────────────────
  reset() {
    if (!confirm('Reset all your votes? This cannot be undone.')) return;
    Storage.reset();
    this.votes        = {};
    this.currentIndex = 0;
    this.updateStartScreen();
    this.showScreen('screen-start');
  },
};

// ── Boot ──────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => App.init());
