// inwora.in — small enhancements only; the page works fully without JavaScript.
(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("site-nav");

  // Mobile menu
  function setMenu(open) {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setMenu(false);
    });
  }

  // Header border once the page scrolls
  function onScroll() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Reveal sections as they scroll into view
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -60px 0px", threshold: 0.08 });
    items.forEach(function (el) { observer.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("is-visible"); });
  }

  // Showcase rail: arrow buttons scroll by about two phones
  var rail = document.querySelector(".phone-rail");
  document.querySelectorAll("[data-scroll]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (!rail) return;
      var item = rail.querySelector("li");
      var step = item ? (item.getBoundingClientRect().width + 22) * 2 : 460;
      rail.scrollBy({ left: step * Number(btn.getAttribute("data-scroll")), behavior: "smooth" });
    });
  });

  /* ── Meta Pixel with consent (same rules as inwora.com) ──────────────
   * Nothing loads before "Accept": no fbevents.js, no cookies, no events.
   * Events: one PageView per page load; Contact when a WhatsApp link is
   * clicked. A WhatsApp click only means "opened WhatsApp", never a Lead.
   * Each event carries an eventID, ready for deduplication if a
   * Conversions API is ever added for inwora.in.
   */
  var PIXEL_ID = "1082744314811489";
  var CONSENT_KEY = "inwora_consent";
  var pixelLoaded = false;
  var pageViewSent = false;

  function readConsent() {
    try {
      var v = window.localStorage.getItem(CONSENT_KEY);
      return v === "granted" || v === "denied" ? v : null;
    } catch (e) { return null; }
  }
  var consent = readConsent();

  function eventId() {
    if (window.crypto && typeof window.crypto.randomUUID === "function") return window.crypto.randomUUID();
    return String(Date.now()) + "-" + Math.random().toString(16).slice(2);
  }

  function loadPixel() {
    if (pixelLoaded || consent !== "granted") return;
    pixelLoaded = true;
    if (window.fbq) return;
    /* Meta's base code */
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    window.fbq.disablePushState = true;
    window.fbq("set", "autoConfig", false, PIXEL_ID);
    window.fbq("init", PIXEL_ID);
  }

  function track(name, data) {
    if (consent !== "granted") return;
    loadPixel();
    if (window.fbq) window.fbq("track", name, data || {}, { eventID: eventId() });
  }

  function trackPageView() {
    if (pageViewSent) return;
    pageViewSent = true;
    track("PageView");
  }

  var banner = document.getElementById("consent");
  var current = banner ? banner.querySelector("[data-consent-current]") : null;

  function showBanner(show) {
    if (!banner) return;
    banner.hidden = !show;
    if (show && current) {
      current.hidden = consent === null;
      current.textContent = consent === "granted" ? "Current choice: accepted." : "Current choice: declined.";
    }
  }

  function setConsent(value) {
    consent = value;
    try { window.localStorage.setItem(CONSENT_KEY, value); } catch (e) { /* storage blocked: this page only */ }
    showBanner(false);
    if (value === "granted") {
      loadPixel();
      if (window.fbq) window.fbq("consent", "grant");
      trackPageView();
    } else {
      // Revoke: stop immediately, drop queued events, remove Meta's cookies.
      var fbq = window.fbq;
      if (fbq) {
        if (!fbq.callMethod && Array.isArray(fbq.queue)) {
          var kept = fbq.queue.filter(function (args) { return args[0] !== "track" && args[0] !== "trackCustom"; });
          fbq.queue.length = 0;
          Array.prototype.push.apply(fbq.queue, kept);
        }
        fbq("consent", "revoke");
      }
      ["_fbp", "_fbc"].forEach(function (name) {
        var expired = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
        document.cookie = expired;
        document.cookie = expired + "; domain=." + location.hostname.replace(/^www\./, "");
      });
    }
  }

  if (banner) {
    banner.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-consent]");
      if (btn) setConsent(btn.getAttribute("data-consent"));
    });
  }
  document.querySelectorAll("[data-consent-open]").forEach(function (btn) {
    btn.addEventListener("click", function () { showBanner(true); });
  });

  if (consent === null) showBanner(true);
  else if (consent === "granted") { loadPixel(); trackPageView(); }

  // Contact = a WhatsApp link was clicked (button label + section, no message text)
  document.addEventListener("click", function (e) {
    var link = e.target.closest('a[href^="https://wa.me/"]');
    if (!link) return;
    var section = link.closest("section[id]");
    var label = (link.getAttribute("aria-label") || link.textContent || "WhatsApp").replace(/\s+/g, " ").trim();
    var name = ((section ? section.id + ": " : "") + label).slice(0, 100);
    track("Contact", { content_name: name, content_category: "WhatsApp" });
  });

  // Current year in the footer
  var year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());
})();
