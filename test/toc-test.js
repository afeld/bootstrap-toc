describe('Toc.helpers', function() {
  describe('#generateUniqueIdBase()', function() {
    it('uses the tag name of the element by default', function() {
      var el = document.createElement('h1');
      var base = Toc.helpers.generateUniqueIdBase(el);
      expect(base).to.eql('h1');
    });
  });
});
