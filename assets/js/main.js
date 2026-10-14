/* GLITCH 2.0 — FRC 8727 site interactions */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Nav scroll state + back-to-top ---------- */
  var nav = document.querySelector('.nav');
  var toTop = document.querySelector('.to-top');
  function onScroll() {
    var y = window.scrollY;
    if (nav) nav.classList.toggle('scrolled', y > 10);
    if (toTop) toTop.classList.toggle('show', y > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    });
  }

  /* ---------- Mobile menu ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.textContent = open ? '✕' : '☰';
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = '☰';
      });
    });
  }

  /* ---------- Active nav link (per page) ---------- */
  var page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a[href]').forEach(function (a) {
    var target = a.getAttribute('href').split('#')[0] || 'index.html';
    if (target === page) a.classList.add('active');
  });

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Home ticker: rotate individual messages ---------- */
  var tickerEl = document.getElementById('ticker-text');
  if (tickerEl) {
    var msgs = [
      'ORIGINS · <b>GLITCH 5854</b> → <b>GLITCH 2.0 (8727)</b>',
      '2026 · <b>DISTRICT EVENT WINNERS</b>',
      'NEXT · <b>THOR WEST</b> — OCT 24, 2026',
      '2024 · <b>2× BLUE BANNER</b>',
      'ROOKIE YEAR · <b>2022</b>',
      'FIRST NC · <b>ASHEVILLE, NC</b>',
      '<b>STUDENT-LED</b> · EVERYONE IS WELCOME',
      '<b>#8727</b> · GLITCH 2.0'
    ];
    var i = 0;
    var render = function () {
      tickerEl.innerHTML = msgs[i];
      tickerEl.classList.remove('fade-out');
    };
    var rotate = function () {
      tickerEl.classList.add('fade-out');
      setTimeout(function () {
        i = (i + 1) % msgs.length;
        render();
      }, 350);
    };
    render();
    if (!reduced) setInterval(rotate, 2800);
  }

  /* ---------- About: terminal typing ---------- */
  var term = document.getElementById('term');
  if (term && !reduced) {
    var lines = [
      { t: '> init glitch2.0 --team=8727', cls: '' },
      { t: '[ OK ] Rookie Year ................ 2022', cls: 'ok' },
      { t: '[ OK ] Home ...................... Asheville, NC', cls: 'ok' },
      { t: '[ OK ] District .................. FIRST North Carolina', cls: 'ok' },
      { t: '[ OK ] Ethos .................... every1 welcome, every1 builds', cls: 'ok' },
      { t: '[ OK ] 2026 record ............... 32-17-0', cls: 'ok' },
      { t: '[ OK ] 2026 result ............... District Event Winner', cls: 'ok' },
      { t: '[ OK ] Blue Banners .............. x2 (2024)', cls: 'ok' },
      { t: '[ OK ] Worlds .................... Houston 2024', cls: 'ok' },
      { t: '> origin', cls: '' },
      { t: '[ >> ] 5854 (2016-2020) --> 8727 (2022-now)', cls: 'dim' },
      { t: '[ >> ] name survived, team rebuilt = 2.0', cls: 'dim' },
      { t: '> the glitch is in the code._', cls: 'dim' }
    ];
    var body = term;
    var li = 0;
    var cur = document.createElement('span');
    cur.className = 'cursor';
    body.appendChild(cur);

    function step() {
      if (li >= lines.length) return;
      var ln = lines[li];
      var div = document.createElement('div');
      div.className = 'line ' + (ln.cls || '');
      var textNode = document.createElement('span');
      textNode.textContent = '';
      div.appendChild(textNode);
      body.insertBefore(div, cur);
      var charIdx = 0;
      var timer = setInterval(function () {
        textNode.textContent += ln.t.charAt(charIdx);
        charIdx++;
        body.scrollTop = body.scrollHeight;
        if (charIdx >= ln.t.length) {
          clearInterval(timer);
          li++;
          setTimeout(step, 200);
        }
      }, 20);
    }
    setTimeout(step, 500);
  } else if (term) {
    var fallback = [
      '> init glitch2.0 --team=8727',
      '[ OK ] Rookie year 2022 · Asheville, NC · FIRST North Carolina',
      '[ OK ] Ethos · every1 welcome, every1 builds',
      '[ OK ] 2026 record 32-17-0 · District Event Winner',
      '> origin · 5854 (2016-2020) -> 8727 (2022-now)',
      '> the glitch is in the code.'
    ];
    fallback.forEach(function (l) {
      var div = document.createElement('div');
      div.className = 'line ' + (l.indexOf('OK') !== -1 ? 'ok' : (l.indexOf('>') === 0 ? '' : 'dim'));
      div.textContent = l;
      term.appendChild(div);
    });
  }

  /* ---------- Results: countdown to THOR West (Sat Oct 24, 2026, 10 AM) ---------- */
  var cd = document.getElementById('countdown');
  if (cd) {
    var target = new Date('2026-10-24T10:00:00-04:00').getTime();
    var cells = {
      d: cd.querySelector('[data-d]'),
      h: cd.querySelector('[data-h]'),
      m: cd.querySelector('[data-m]'),
      s: cd.querySelector('[data-s]')
    };
    var pad = function (n) { return String(n).padStart(2, '0'); };
    var tick = function () {
      var diff = target - Date.now();
      if (diff <= 0) {
        cells.d.textContent = '00'; cells.h.textContent = '00';
        cells.m.textContent = '00'; cells.s.textContent = '00';
        return;
      }
      cells.d.textContent = pad(Math.floor(diff / 86400000));
      cells.h.textContent = pad(Math.floor((diff % 86400000) / 3600000));
      cells.m.textContent = pad(Math.floor((diff % 3600000) / 60000));
      cells.s.textContent = pad(Math.floor((diff % 60000) / 1000));
    };
    tick();
    setInterval(tick, 1000);
  }

  /* ---------- Custom PayPal donation amount ---------- */
  var donateForm = document.getElementById('donate-custom');
  if (donateForm) {
    var dcInput = document.getElementById('dc-input');
    var dcAmount = document.getElementById('dc-amount');
    var dcError = donateForm.querySelector('.dc-error');

    donateForm.addEventListener('submit', function (e) {
      var val = parseFloat(dcInput.value);
      if (!isFinite(val) || val < 1 || val > 25000) {
        e.preventDefault();
        donateForm.classList.add('error');
        dcInput.focus();
        return;
      }
      donateForm.classList.remove('error');
      dcAmount.value = val.toFixed(2);
    });

    dcInput.addEventListener('input', function () {
      donateForm.classList.remove('error');
    });
  }

  /* ---------- Footer year ---------- */
  var yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();
})();
