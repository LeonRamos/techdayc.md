/* ============================================================
   Tec Tech Day 2026 — Subtle JS enhancements
   - Countdown to 28 May 2026, 09:00 (America/Mexico_City, UTC-6)
   - Mobile nav toggle
   - Sticky nav shadow on scroll
   - Active nav link via IntersectionObserver
   - Scroll reveal for [data-reveal]
   - Year in footer
   No localStorage, no dependencies.
   ============================================================ */

(function () {
  "use strict";

  /* ---------------- Year ---------------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------- Countdown ---------------- */
  // Event start: 28 May 2026, 09:00 local time at TSJ Zapopan (UTC-6, no DST).
  var EVENT_TS = Date.parse("2026-05-28T09:00:00-06:00");

  var cd = {
    days: document.querySelector('[data-cd="days"]'),
    hours: document.querySelector('[data-cd="hours"]'),
    minutes: document.querySelector('[data-cd="minutes"]'),
    seconds: document.querySelector('[data-cd="seconds"]'),
    root: document.getElementById("countdown"),
  };

  function pad(n) {
    n = Math.max(0, Math.floor(n));
    return n < 10 ? "0" + n : String(n);
  }

  function renderCountdown() {
    if (!cd.root) return;
    var diff = EVENT_TS - Date.now();

    if (diff <= 0) {
      cd.root.classList.add("is-done");
      if (cd.days) cd.days.textContent = "00";
      if (cd.hours) cd.hours.textContent = "00";
      if (cd.minutes) cd.minutes.textContent = "00";
      if (cd.seconds) cd.seconds.textContent = "00";
      return;
    }

    var s = Math.floor(diff / 1000);
    var days = Math.floor(s / 86400);
    var hours = Math.floor((s % 86400) / 3600);
    var minutes = Math.floor((s % 3600) / 60);
    var seconds = s % 60;

    if (cd.days) cd.days.textContent = pad(days);
    if (cd.hours) cd.hours.textContent = pad(hours);
    if (cd.minutes) cd.minutes.textContent = pad(minutes);
    if (cd.seconds) cd.seconds.textContent = pad(seconds);
  }

  renderCountdown();
  // Update every second; cheap and the spec asks for subtle, sober motion.
  setInterval(renderCountdown, 1000);

  /* ---------------- Sticky nav shadow on scroll ---------------- */
  var nav = document.getElementById("nav");
  function handleScroll() {
    if (!nav) return;
    if (window.scrollY > 8) nav.classList.add("is-scrolled");
    else nav.classList.remove("is-scrolled");
  }
  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });

  /* ---------------- Mobile nav toggle ---------------- */
  var navToggle = document.getElementById("navToggle");
  var navMobile = document.getElementById("navMobile");

  function closeMobile() {
    if (!navToggle || !navMobile) return;
    navToggle.setAttribute("aria-expanded", "false");
    navMobile.classList.remove("is-open");
    navMobile.hidden = true;
  }
  function openMobile() {
    if (!navToggle || !navMobile) return;
    navToggle.setAttribute("aria-expanded", "true");
    navMobile.hidden = false;
    // next frame so transition can apply
    requestAnimationFrame(function () {
      navMobile.classList.add("is-open");
    });
  }

  if (navToggle && navMobile) {
    navToggle.addEventListener("click", function () {
      var expanded = navToggle.getAttribute("aria-expanded") === "true";
      if (expanded) closeMobile();
      else openMobile();
    });
    // Close when a link inside the menu is clicked
    navMobile.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMobile);
    });
    // Close with Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMobile();
    });
    // Close when resizing to desktop
    window.addEventListener("resize", function () {
      if (window.innerWidth > 720) closeMobile();
    });
  }

  /* ---------------- Active nav link via IntersectionObserver ---------------- */
  var navLinks = document.querySelectorAll(".nav__links a");
  var sectionIds = ["evento", "talleres", "agenda", "faq"];
  var sectionsForObserver = sectionIds
    .map(function (id) {
      return document.getElementById(id);
    })
    .filter(Boolean);

  function setActive(id) {
    navLinks.forEach(function (link) {
      var href = link.getAttribute("href") || "";
      if (href === "#" + id) link.classList.add("is-active");
      else link.classList.remove("is-active");
    });
  }

  if ("IntersectionObserver" in window && sectionsForObserver.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        // Pick the most visible section currently intersecting
        var visible = entries
          .filter(function (e) {
            return e.isIntersecting;
          })
          .sort(function (a, b) {
            return b.intersectionRatio - a.intersectionRatio;
          });
        if (visible[0]) setActive(visible[0].target.id);
      },
      {
        // Trigger near the top to align with sticky nav
        rootMargin: "-45% 0px -45% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );
    sectionsForObserver.forEach(function (s) {
      observer.observe(s);
    });
  }

  /* ---------------- Scroll reveal ---------------- */
  var reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var revealEls = document.querySelectorAll("[data-reveal]");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else {
    var revealObs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );
    revealEls.forEach(function (el) {
      revealObs.observe(el);
    });
  }
})();
