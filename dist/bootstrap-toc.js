/*!
 * Bootstrap Table of Contents v0.4.1 (http://afeld.github.io/bootstrap-toc/)
 * Copyright 2015 Aidan Feldman
 * Licensed under MIT (https://github.com/afeld/bootstrap-toc/blob/gh-pages/LICENSE.md) */
(function($) {
  'use strict';

  window.Toc = {
    helpers: {
      // return all matching elements in the set, or their descendants
      findOrFilter: function($el, selector) {
        // http://danielnouri.org/notes/2011/03/14/a-jquery-find-that-also-finds-the-root-element/
        // http://stackoverflow.com/a/12731439/358804
        var $descendants = $el.find(selector);
        return $el.filter(selector).add($descendants).filter(':not([data-toc-skip])');
      },

      generateUniqueIdBase: function(el) {
        var text = $(el).text();
        var anchor = text.trim().toLowerCase().replace(/[^A-Za-z0-9]+/g, '-');
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

      generateNavEl: function(anchor, text) {
        var $a = $('<a></a>');
        $a.attr('href', '#' + anchor);
        $a.text(text);
        var $li = $('<li></li>');
        $li.append($a);
        return $li;
      },

      generateNavItem: function(headingEl) {
        var anchor = this.generateAnchor(headingEl);
        var $heading = $(headingEl);
        var text = $heading.data('toc-text') || $heading.text();
        return this.generateNavEl(anchor, text);
      },

      // Find the first heading level (`<h1>`, then `<h2>`, etc.) that has more than one element. Defaults to 1 (for `<h1>`).
      getTopLevel: function($scope) {
        for (var i = 1; i <= 6; i++) {
          var $headings = this.findOrFilter($scope, 'h' + i);
          if ($headings.length > 1) {
            return i;
          }
        }

        return 1;
      },
      
      // get the last level to evaluate until (i.e. default starting h1, last level will be 2 so we will evaluate all h1 and h2 elements)
      getLastLevel: function($nav, topLevel) {
		  // get the max number of levels to generate (default 2)
		  var levels = 2;
		  var levelsAttr = $nav.attr('data-levels');
		  if ($.isNumeric(levelsAttr)) {
			levels = parseInt(levelsAttr);
		  }

		  var lastLevel = topLevel + levels - 1;
		  if (lastLevel > 6) return 6;
		  if (lastLevel < topLevel) return topLevel;
		  return lastLevel;
      },

      // returns the elements for given level range
      getHeadings: function($scope, startLevel, endLevel) {
		var filter = 'h' + startLevel;
		for (var i = startLevel + 1; i <= endLevel; ++i) {
		  filter += ',h' + i;
		}
        return this.findOrFilter($scope, filter);
      },

      getNavLevel: function(el) {
        return parseInt(el.tagName.charAt(1), 10);
      },

      populateNav: function($context, $headings, firstLevel, lastLevel) {
        var helpers = this;
        var contexts = [];
        var curLevel = firstLevel;
        var $curContext = $context;
        var $prevNav;
        $headings.each(function(i, el) {
          var navLevel = helpers.getNavLevel(el);
          
          if (navLevel == curLevel + 1) {
		    if (curLevel == lastLevel || !$prevNav) {
		      return;
		    }
		    
		    contexts.push($curContext);
		    $curContext = helpers.createChildNavList($prevNav);
		    ++curLevel;
          }
          else if (navLevel < curLevel) {
            if (navLevel < firstLevel) {
              return;
            }
            
            while (curLevel > navLevel) {
			  $curContext = contexts.pop();
              --curLevel;
            }
          }
          
          if (navLevel != curLevel) {
            return;
          }
          
          $prevNav = helpers.generateNavItem(el);
          $curContext.append($prevNav);
        });
      },

      parseOps: function(arg) {
        var opts;
        if (arg.jquery) {
          opts = {
            $nav: arg
          };
        } else {
          opts = arg;
        }
        opts.$scope = opts.$scope || $(document.body);
        return opts;
      }
    },

    // accepts a jQuery object, or an options object
    init: function(opts) {
      opts = this.helpers.parseOps(opts);

	  // ensure that the data attribute is in place for styling
	  opts.$nav.attr('data-toggle', 'toc');

      var $topContext = this.helpers.createChildNavList(opts.$nav);
      var topLevel = this.helpers.getTopLevel(opts.$scope);
      var lastLevel = this.helpers.getLastLevel(opts.$nav, topLevel);
      
      var $headings = this.helpers.getHeadings(opts.$scope, topLevel, lastLevel);
      this.helpers.populateNav($topContext, $headings, topLevel, lastLevel);
    }
  };

  $(function() {
    $('nav[data-toggle="toc"]').each(function(i, el) {
      var $nav = $(el);
      Toc.init($nav);
    });
  });
})(jQuery);
