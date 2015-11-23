var $fixture = $('#mocha-fixture');

afterEach(function() {
  $fixture.empty();
});

describe('Toc', function() {
  describe('.helpers', function() {
    describe('.generateUniqueIdBase()', function() {
      it("uses the text from the element", function() {
        var el = document.createElement('h1');
        el.innerHTML = "Some  tExt- with aidan's /. stuff   "
        var base = Toc.helpers.generateUniqueIdBase(el);
        expect(base).to.eql('some-text-with-aidan-s-stuff');
      });

      it("uses the tag name of the element if there's no text", function() {
        var el = document.createElement('h1');
        var base = Toc.helpers.generateUniqueIdBase(el);
        expect(base).to.eql('h1');
      });
    });

    describe('.generateUniqueId()', function() {
      it("uses the tag name", function() {
        var el = document.createElement('h1');
        var base = Toc.helpers.generateUniqueId(el);
        expect(base).to.eql('h1');
      });

      it("adds a suffix when there's an existing element with that tag", function() {
        $fixture.append('<h1 id="h1"></h1>');

        var el = document.createElement('h1');
        var base = Toc.helpers.generateUniqueId(el);
        expect(base).to.eql('h1-1');
      });
    });

    describe('.getTopLevel()', function() {
      it("returns 1 by default", function() {
        var $scope = $('<div></div>');
        var level = Toc.helpers.getTopLevel($scope);
        expect(level).to.eql(1);
      });

      it("returns the first level with more than one element", function() {
        var $scope = $(
          '<div>' +
            '<h1></h1>' +
            '<h2></h2>' +
            '<h3></h3>' +
            '<h3></h3>' +
          '</div>'
        );
        var level = Toc.helpers.getTopLevel($scope);
        expect(level).to.eql(3);
      });
    });

    describe('.getNavLevel()', function() {
      it("returns the value from the tag", function() {
        var el = document.createElement('h5');
        var level = Toc.helpers.getNavLevel(el);
        expect(level).to.eql(5);
      });
    });
  });

  describe('.init()', function() {
    it("handles single-level headings", function() {
      var $nav = $('<nav>');
      $fixture.append($nav);
      $fixture.append(
        '<h1>H1</h1>' +
        '<h1>H1</h1>' +
        '<h1>H1</h1>'
      );

      Toc.init({
        $nav: $nav,
        $scope: $fixture
      });

      expect($nav.find('li').length).to.eql(3);
      expect($nav.text()).to.eql('H1H1H1');
    });

    it("handles nested headings", function() {
      var $nav = $('<nav>');
      $fixture.append($nav);
      $fixture.append(
        '<h1>H1</h1>' +
        '<h2>H2</h2>' +
        '<h3>H3</h3>' +
        '<h4>H4</h4>' +
        '<h2>H2-1</h2>'
      );

      Toc.init({
        $nav: $nav,
        $scope: $fixture
      });

      expect($nav.find('li').length).to.eql(3);
      expect($nav.text()).to.eql('H2H3H2-1');
    });
  });
});
