// inspiration:
// * https://jsfiddle.net/gableroux/S2SMK/
// * http://gregfranko.com/jquery.tocify.js/
$(function() {
  var $toc = $('#toc');

  // essentially a media query for Bootstrap's col-sm-* breakpoint – make the table of contents "sticky" on wider screen sizes
  if ($(window).width() >= 768) {
    $toc.addClass('sticky');
  }

  var generateUniqueIdBase = function(el) {
    var text = $(el).text();
    return text.toLowerCase().replace(/\s+/, '-').replace(/[^\w\-]+/, '');
  };

  var generateUniqueId = function(el) {
    var anchor = generateUniqueIdBase(el);
    if (document.getElementById(anchor)) {
      // ID already exists
      for (var i = 1; ; i++) {
        var newAnchor = anchor + '-' + i;
        // check if ID already exists
        if (!document.getElementById(newAnchor)) {
          return newAnchor;
        }
      }
    } else {
      return anchor;
    }
  };

  var getAnchor = function(el) {
    if (el.id) {
      return el.id;
    } else {
      return generateUniqueId(el);
    }
  };

  var $context = $('<ul></ul>');
  $toc.append($context);

  $('h1,h2,h3,h4').each(function(i, el) {
    var anchor = getAnchor(el);
    if (!el.id) {
      el.id = anchor;
    }

    var text = $(el).text();

    var $newNav = $('<li><a href="#' + anchor + '">' + text + '</a></li>');
    var navLevel = parseInt(el.tagName.charAt(1), 10);
    $newNav.data('nav-level', navLevel);

    // adjust the context
    var i = 0;
    // `i` is just a safety valve, so we don't accidentally get an endless loop
    while (i < 10) {
      var prevNav = $context.children('li:last')[0];
      if (prevNav) {
        var $prevNav = $(prevNav);
        var prevNavLevel = $prevNav.data('nav-level');
        if (navLevel > prevNavLevel) {
          // create a new level of the tree
          var $childList = $('<ul></ul>');
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
    $context.append($newNav);
  });

  $('.sticky').Stickyfill();
});
