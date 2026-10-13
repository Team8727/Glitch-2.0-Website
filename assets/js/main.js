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

  /* ---------- Scrollspy ---------- */
  var spyLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  var sections = [];
  spyLinks.forEach(function (a) {
    var id = a.getAttribute('href').slice(1);
    var el = document.getElementById(id);
    if (el) sections.push({ id: id, el: el, link: a });
  });
  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          sections.forEach(function (s) {
            s.link.classList.toggle('active', s.id === en.target.id);
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(function (s) { spy.observe(s.el); });
  }

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

  /* ---------- Marquee: duplicate content for seamless loop ---------- */
  var track = document.querySelector('.marquee-track');
  if (track) {
    // Duplicate the items inside the single track; the CSS animates translateX(-50%),
    // which then loops seamlessly (one full copy of the content per loop).
    track.innerHTML += track.innerHTML;
  }

  /* ---------- Terminal typing ---------- */
  var term = document.getElementById('term');
  if (term && !reduced) {
    var lines = [
      { t: '> init glitch2.0 --team=8727', cls: '' },
      { t: '[ OK ] FRC Rookie Year ................ 2022', cls: 'ok' },
      { t: '[ OK ] Home .......................... Asheville, NC', cls: 'ok' },
      { t: '[ OK ] District ...................... FIRST North Carolina', cls: 'ok' },
      { t: '[ OK ] Ethos ......................... welcoming + all-inclusive', cls: 'ok' },
      { t: '[ OK ] 2026 record ................... 32-17-0', cls: 'ok' },
      { t: '[ OK ] 2026 result ................... District Event Winner', cls: 'ok' },
      { t: '[ OK ] Blue Banners .................. x2 (2024)', cls: 'ok' },
      { t: '[ OK ] Worlds ........................ Houston 2024', cls: 'ok' },
      { t: '> status --next', cls: '' },
      { t: '[ >> ] THOR West 2026 ................ Oct 24', cls: '' },
      { t: '[ >> ] 2027 BIOCORE kickoff ........... Jan 9, 2027', cls: '' },
      { t: '> the glitch is in the code._', cls: 'dim' }
    ];
    var body = term;
    var li = 0;
    var ci = 0;
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
          setTimeout(step, 240);
        }
      }, 22);
    }
    setTimeout(step, 500);
  } else if (term) {
    // Static fallback for reduced motion / no JS-heavy typing
    var fallback = [
      '> init glitch2.0 --team=8727',
      '[ OK ] Rookie year 2022 · Asheville, NC · FIRST North Carolina',
      '[ OK ] 2026 record 32-17-0 · District Event Winner',
      '[ OK ] Blue Banners x2 (2024) · Worlds Houston 2024',
      '> next: THOR West 2026 (Oct 24) · BIOCORE kickoff Jan 9 2027',
      '> the glitch is in the code.'
    ];
    fallback.forEach(function (l) {
      var div = document.createElement('div');
      div.className = 'line ' + (l.indexOf('OK') !== -1 ? 'ok' : (l.indexOf('>') === 0 ? '' : 'dim'));
      div.textContent = l;
      term.appendChild(div);
    });
  }

  /* ---------- Countdown to THOR West (Sat Oct 24, 2026, 10:00 AM) ---------- */
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
      var d = Math.floor(diff / 86400000);
      var h = Math.floor((diff % 86400000) / 3600000);
      var m = Math.floor((diff % 3600000) / 60000);
      var s = Math.floor((diff % 60000) / 1000);
      cells.d.textContent = pad(d);
      cells.h.textContent = pad(h);
      cells.m.textContent = pad(m);
      cells.s.textContent = pad(s);
    };
    tick();
    setInterval(tick, 1000);
  }

  /* ---------- Footer year ---------- */
  var yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();
})();
