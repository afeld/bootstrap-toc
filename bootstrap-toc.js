/*!
 * Bootstrap Table of Contents v<%= version %> (http://afeld.github.io/bootstrap-toc/)
 * Copyright 2015 Aidan Feldman
 * Licensed under MIT (https://github.com/afeld/bootstrap-toc/blob/gh-pages/LICENSE.md) */
(function() {
  'use strict';

  window.Toc = {
    helpers: {
      generateUniqueIdBase: function(el) {
        var text = $(el).text();
        var anchor = text.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
        return anchor || el.tagName.toLowerCase();
      },

      generateUniqueId: function(el) {
        var anchorBase = this.generateUniqueIdBase(el);
        for (var i = 0; ; i++) {
          var anchor = anchorBase;
          if (i > 0) {
            // add suffix
            anchor += '-' + i;
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
        return $('<ul class="nav"></ul>');
      },

      createChildNavList: function($parent) {
        var $childList = this.createNavList();
        $parent.append($childList);
        return $childList;
      },

      generateNavItem: function(headingEl) {
        var anchor = this.generateAnchor(headingEl);
        var text = $(headingEl).text();
        return $('<li><a href="#' + anchor + '">' + text + '</a></li>');
      },

      // Find the first heading level (`<h1>`, then `<h2>`, etc.) that has more than one element. Defaults to 1 (for `<h1>`).
      getTopLevel: function() {
        var topLevel;
        for (var i = 1; i < 4; i++) {
          var $headings = $('h' + i);
          if ($headings.length > 1) {
            topLevel = i;
            break;
          }
        }

        return topLevel || 1;
      },

      // returns the elements for the top level, and the next below it
      getHeadings: function(topLevel) {
        var topSelector = 'h' + topLevel;

        var secondaryLevel = topLevel + 1;
        var secondarySelector = 'h' + secondaryLevel;

        return $(topSelector + ',' + secondarySelector);
      },

      getNavLevel: function(el) {
        return parseInt(el.tagName.charAt(1), 10);
      },

      populateNav: function($topContext, topLevel, $headings) {
        var $context = $topContext;
        var $prevNav;

        var _this = this;
        $headings.each(function(i, el) {
          var $newNav = _this.generateNavItem(el);
          var navLevel = _this.getNavLevel(el);

          // determine the proper $context
          if (navLevel === topLevel) {
            // use top level
            $context = $topContext;
          } else if ($prevNav && $context === $topContext) {
            // create a new level of the tree and switch to it
            $context = _this.createChildNavList($prevNav);
          } // else use the current $context

          $context.append($newNav);

          $prevNav = $newNav;
        });
      }
    },

    init: function($base) {
      var $topContext = this.helpers.createChildNavList($base);
      var topLevel = this.helpers.getTopLevel();
      var $headings = this.helpers.getHeadings(topLevel);
      this.helpers.populateNav($topContext, topLevel, $headings);
    }
  };

  $(function() {
    $('nav[data-toggle="toc"]').each(function(i, el) {
      var $toc = $(el);
      Toc.init($toc);
    });
  });
})();
