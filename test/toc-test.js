afterEach(function() {
  $('#mocha-fixture').empty();
});

describe('Toc.helpers', function() {
  describe('#generateUniqueIdBase()', function() {
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

  describe('#generateUniqueId()', function() {
    it("uses the tag name", function() {
      var el = document.createElement('h1');
      var base = Toc.helpers.generateUniqueId(el);
      expect(base).to.eql('h1');
    });

    it("adds a suffix when there's an existing element with that tag", function() {
      $('#mocha-fixture').append('<h1 id="h1"></h1>');

      var el = document.createElement('h1');
      var base = Toc.helpers.generateUniqueId(el);
      expect(base).to.eql('h1-1');
    });
  });
});
