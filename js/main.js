/* ============================================================
   CAPITAL SMART — Minimal Vanilla JavaScript
   No frameworks, no libraries
   ============================================================ */

(function () {
  'use strict';

  /* --- Header scroll effect --- */
  var header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  /* --- Mobile menu toggle --- */
  var toggle = document.querySelector('.header__toggle');
  var mobileNav = document.querySelector('.nav-mobile');

  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('active');
      mobileNav.classList.toggle('open');
    });

    /* Close menu when clicking a link */
    mobileNav.querySelectorAll('.header__link').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.classList.remove('active');
        mobileNav.classList.remove('open');
      });
    });

    /* Close menu when clicking outside */
    document.addEventListener('click', function (e) {
      if (!toggle.contains(e.target) && !mobileNav.contains(e.target)) {
        toggle.classList.remove('active');
        mobileNav.classList.remove('open');
      }
    });
  }

  /* --- FAQ accordion --- */
  document.querySelectorAll('.faq__item').forEach(function (item) {
    var question = item.querySelector('.faq__question');
    if (question) {
      question.addEventListener('click', function () {
        var isOpen = item.classList.contains('open');

        /* Close all */
        document.querySelectorAll('.faq__item').forEach(function (other) {
          other.classList.remove('open');
        });

        /* Toggle current */
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    }
  });

  /* --- Intersection Observer for reveal animations --- */
  if ('IntersectionObserver' in window) {
    var observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    };

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(function (el) {
      observer.observe(el);
    });
  } else {
    /* Fallback: show everything immediately */
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('visible');
    });
  }

})();
