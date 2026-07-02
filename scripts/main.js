/* AF · Estudio Creativo — progressive enhancement only.
   All content lives in the HTML; this file just improves the experience
   (mobile nav + composing the contact message). Guards for missing nodes so
   it never throws (WDS-CODE-008/009, WDS-PERF-010). */
(function () {
  'use strict';

  /* ---- Mobile navigation -------------------------------------------------- */
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');

  if (header && toggle && nav) {
    var mqDesktop = window.matchMedia('(min-width: 1024px)');

    function setOpen(open) {
      header.setAttribute('data-nav-open', open ? 'true' : 'false');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    }
    function isOpen() { return header.getAttribute('data-nav-open') === 'true'; }

    toggle.addEventListener('click', function () { setOpen(!isOpen()); });

    nav.addEventListener('click', function (e) {
      var link = e.target.closest('a');
      if (link && !mqDesktop.matches) setOpen(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen() && !mqDesktop.matches) {
        setOpen(false);
        toggle.focus();
      }
    });

    document.addEventListener('click', function (e) {
      if (!isOpen() || mqDesktop.matches) return;
      if (!header.contains(e.target)) setOpen(false);
    });

    mqDesktop.addEventListener('change', function (e) {
      if (e.matches) setOpen(false);
    });
  }

  /* ---- Contact form → WhatsApp (mailto stays as the no-JS fallback) -------- */
  var form = document.getElementById('contact-form');
  if (form) {
    var WA = 'https://wa.me/5493462598745';
    var okMsg = document.getElementById('cf-ok');
    var fields = [
      { id: 'cf-name', err: 'cf-name-error' },
      { id: 'cf-email', err: 'cf-email-error' },
      { id: 'cf-msg', err: 'cf-msg-error' }
    ];

    function validateField(f) {
      var el = document.getElementById(f.id);
      var err = document.getElementById(f.err);
      if (!el || !err) return true;
      var ok = el.checkValidity();
      err.hidden = ok;
      if (ok) el.removeAttribute('aria-invalid');
      else el.setAttribute('aria-invalid', 'true');
      return ok;
    }

    fields.forEach(function (f) {
      var el = document.getElementById(f.id);
      if (el) el.addEventListener('input', function () { validateField(f); });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var firstInvalid = null, allOk = true;
      fields.forEach(function (f) {
        var ok = validateField(f);
        if (!ok) { allOk = false; if (!firstInvalid) firstInvalid = document.getElementById(f.id); }
      });
      if (!allOk) { if (firstInvalid) firstInvalid.focus(); return; }

      var name = document.getElementById('cf-name').value.trim();
      var email = document.getElementById('cf-email').value.trim();
      var msg = document.getElementById('cf-msg').value.trim();
      var text = 'Hola AF, soy ' + name + ' (' + email + '). ' + msg;

      if (okMsg) okMsg.hidden = false;
      window.open(WA + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
      form.reset();
    });
  }
})();
