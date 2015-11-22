// inspiration:
// * https://jsfiddle.net/gableroux/S2SMK/
// * http://gregfranko.com/jquery.tocify.js/
$(function() {
  var generateUniqueIdBase = function(el) {
    var text = $(el).text();
    var anchor = text.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
    return anchor || el.tagName.toLowerCase();
  };

  var generateUniqueId = function(el) {
    var anchorBase = generateUniqueIdBase(el);
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
  };

  var generateAnchor = function(el) {
    if (el.id) {
      return el.id;
    } else {
      var anchor = generateUniqueId(el);
      el.id = anchor;
      return anchor;
    }
  };

  var createNavList = function() {
    return $('<ul class="nav"></ul>');
  };

  var getContext = function($startingContext, navLevel) {
    var $context = $startingContext;

    // `i` is just a safety valve, so we don't accidentally get an endless loop
    var i = 0;
    // this is the maximum number of times it can walk up or down the tree
    while (i < 10) {
      var prevNav = $context.children('li:last')[0];
      if (prevNav) {
        var $prevNav = $(prevNav);
        var prevNavLevel = $prevNav.data('nav-level');
        if (navLevel > prevNavLevel) {
          // create a new level of the tree
          var $childList = createNavList();
          $prevNav.append($childList);
          $context = $childList;
        } else if (navLevel < prevNavLevel) {
          // walk up the tree
          var $parentContext = $context.parent('li').parent('ul');
          if ($parentContext.length) {
            $context = $parentContext;
          } else {
            // we've reached the top-level element
            break;
          }
        } else {
          // matching level
          break;
        }
      } else {
        // no previous element
        break;
      }

      i++;
    }

    return $context;
  };

  var generateNavItem = function(headerEl) {
    var anchor = generateAnchor(headerEl);
    var text = $(headerEl).text();
    return $('<li><a href="#' + anchor + '">' + text + '</a></li>');
  };

  // Find the first heading level (`<h1>`, then `<h2>`, etc.) that has more than one element. Defaults to 1 (for `<h1>`).
  var getTopLevel = function() {
    var topLevel;
    for (var i = 1; i < 4; i++) {
      var $headings = $('h' + i);
      if ($headings.length > 1) {
        topLevel = i;
        break;
      }
    }

    return topLevel || 1;
  };

  var init = function($base) {
    var $context = createNavList();
    $base.append($context);

    var topLevel = getTopLevel();
    // use the top level, and the next below it
    var $headings = $('h' + topLevel + ',h' + (topLevel + 1));

    $headings.each(function(i, el) {
      var $newNav = generateNavItem(el);

      var navLevel = parseInt(el.tagName.charAt(1), 10);
      $newNav.data('nav-level', navLevel);

      $context = getContext($context, navLevel);
      $context.append($newNav);
    });
  };

  var $toc = $('#toc');
  init($toc);
});
