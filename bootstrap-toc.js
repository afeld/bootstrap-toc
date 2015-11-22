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

  // returns the elements for the top level, and the next below it
  var getHeadings = function(topLevel) {
    var topSelector = 'h' + topLevel;

    var secondaryLevel = topLevel + 1;
    var secondarySelector = 'h' + secondaryLevel;

    return $(topSelector + ',' + secondarySelector);
  };

  var init = function($base) {
    var $topContext = createNavList();
    $base.append($topContext);

    var topLevel = getTopLevel();
    var $headings = getHeadings(topLevel);

    var $context = $topContext;
    var $prevNav;

    $headings.each(function(i, el) {
      var $newNav = generateNavItem(el);
      var navLevel = parseInt(el.tagName.charAt(1), 10);

      if (navLevel === topLevel) {
        $context = $topContext;
      } else {
        // secondary
        if ($prevNav && $context === $topContext) {
          // create a new level of the tree
          var $childList = createNavList();
          $prevNav.append($childList);
          $context = $childList;
        } // else use the current $context
      }

      $context.append($newNav);

      $prevNav = $newNav;
    });
  };

  var $toc = $('#toc');
  init($toc);
});
