/*!
 * Bootstrap Table of Contents v<%= version %> (http://afeld.github.io/bootstrap-toc/)
 * Copyright 2015 Aidan Feldman
 * Licensed under MIT (https://github.com/afeld/bootstrap-toc/blob/gh-pages/LICENSE.md) */
(function($) {
  "use strict";

  window.Toc = {
    helpers: {
      // return all matching elements in the set, or their descendants
      findOrFilter: function(el, selector) {
        var parent = el.parentElement || el;
        var descendants = parent.querySelectorAll(selector);
        var arr = [];

        for (var i = 0; i < descendants.length; i++) {
          var descendent = descendants[i];
          if (
            descendent === el ||
            (descendent.parentElement !== el.parentElement &&
              descendent.getAttribute("data-toc-skip") === null)
          ) {
            arr.push(descendent);
          }
        }

        return arr.filter(function(item) {
          if (item === el) return true;
          while (item !== null) {
            if (item.parentElement === el) return true;
            item = item.parentElement;
          }
          return false;
        });
      },

      generateUniqueIdBase: function(el) {
        var text = el.textContent;

        // adapted from
        // https://github.com/bryanbraun/anchorjs/blob/65fede08d0e4a705f72f1e7e6284f643d5ad3cf3/anchor.js#L237-L257

        // Regex for finding the non-safe URL characters (many need escaping): & +$,:;=?@"#{}|^~[`%!'<>]./()*\ (newlines, tabs, backspace, & vertical tabs)
        var nonsafeChars = /[& +$,:;=?@"#{}|^~[`%!'<>\]\.\/\(\)\*\\\n\t\b\v]/g,
          urlText;

        // Note: we trim hyphens after truncating because truncating can cause dangling hyphens.
        // Example string:                      // " ⚡⚡ Don't forget: URL fragments should be i18n-friendly, hyphenated, short, and clean."
        urlText = text
          .trim() // "⚡⚡ Don't forget: URL fragments should be i18n-friendly, hyphenated, short, and clean."
          .replace(/\'/gi, "") // "⚡⚡ Dont forget: URL fragments should be i18n-friendly, hyphenated, short, and clean."
          .replace(nonsafeChars, "-") // "⚡⚡-Dont-forget--URL-fragments-should-be-i18n-friendly--hyphenated--short--and-clean-"
          .replace(/-{2,}/g, "-") // "⚡⚡-Dont-forget-URL-fragments-should-be-i18n-friendly-hyphenated-short-and-clean-"
          .substring(0, 64) // "⚡⚡-Dont-forget-URL-fragments-should-be-i18n-friendly-hyphenated-"
          .replace(/^-+|-+$/gm, "") // "⚡⚡-Dont-forget-URL-fragments-should-be-i18n-friendly-hyphenated"
          .toLowerCase(); // "⚡⚡-dont-forget-url-fragments-should-be-i18n-friendly-hyphenated"

        return urlText || el.tagName.toLowerCase();
      },

      generateUniqueId: function(el) {
        var anchorBase = this.generateUniqueIdBase(el);
        for (var i = 0; ; i++) {
          var anchor = anchorBase;
          if (i > 0) {
            // add suffix
            anchor += "-" + i;
          }
          // check if ID already exists
          if (!document.getElementById(anchor)) {
            return anchor;
          }
        }
      },

      generateAnchor: function(el) {
        if (el.id) {
          return el.id;
        } else {
          var anchor = this.generateUniqueId(el);
          el.id = anchor;
          return anchor;
        }
      },

      createNavList: function() {
        var ul = document.createElement("ul");
        ul.classList.add("nav", "navbar-nav");
        return ul;
      },

      createChildNavList: function(parent) {
        var childList = this.createNavList();
        parent.appendChild(childList);
        return childList;
      },

      generateNavEl: function(anchor, text) {
        var a = document.createElement("a");
        a.classList.add("nav-link");
        a.setAttribute("href", "#" + anchor);
        a.innerText = text;
        var li = document.createElement("li");
        li.appendChild(a);
        return li;
      },

      generateNavItem: function(headingEl) {
        var anchor = this.generateAnchor(headingEl);
        var text =
          headingEl.getAttribute("data-toc-text") || headingEl.textContent;
        return this.generateNavEl(anchor, text);
      },

      // Find the first heading level (`<h1>`, then `<h2>`, etc.) that has more than one element. Defaults to 1 (for `<h1>`).
      getTopLevel: function(scope) {
        for (var i = 1; i <= 6; i++) {
          var headings = this.findOrFilter(scope, "h" + i);
          if (headings.length > 1) {
            return i;
          }
        }

        return 1;
      },

      // returns the elements for the top level, and the next below it
      getHeadings: function(scope, topLevel) {
        var topSelector = "h" + topLevel;

        var secondaryLevel = topLevel + 1;
        var secondarySelector = "h" + secondaryLevel;

        return this.findOrFilter(scope, topSelector + "," + secondarySelector);
      },

      getNavLevel: function(el) {
        return parseInt(el.tagName.charAt(1), 10);
      },

      populateNav: function(topContext, topLevel, headings) {
        var context = topContext;
        var prevNav;

        var helpers = this;
        headings.forEach(function(el) {
          var newNav = helpers.generateNavItem(el);
          var navLevel = helpers.getNavLevel(el);

          // determine the proper context
          if (navLevel === topLevel) {
            // use top level
            context = topContext;
          } else if (prevNav && context === topContext) {
            // create a new level of the tree and switch to it
            context = helpers.createChildNavList(prevNav);
          } // else use the current context

          context.appendChild(newNav);

          prevNav = newNav;
        });
      },

      parseOps: function(arg) {
        var opts;
        if (arg instanceof Element) {
          opts = {
            nav: arg
          };
        } else {
          opts = arg;
        }
        opts.scope = opts.scope || document.body;
        return opts;
      }
    },

    // accepts an Element object, or an options object
    init: function(opts) {
      opts = this.helpers.parseOps(opts);

      // ensure that the data attribute is in place for styling
      opts.nav.setAttribute("data-toggle", "toc");

      var topContext = this.helpers.createChildNavList(opts.nav);
      var topLevel = this.helpers.getTopLevel(opts.scope);
      var headings = this.helpers.getHeadings(opts.scope, topLevel);
      this.helpers.populateNav(topContext, topLevel, headings);
    }
  };

  $(function() {
    $('nav[data-toggle="toc"]').each(function(i, el) {
      var $nav = $(el);
      Toc.init($nav);
    });
  });
})(jQuery);
