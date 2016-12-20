# bootstrap-toc
An automatic table of contents generator, using Bootstrap 3

Adding a readme for this bootstrap-toc
For proper regex for the ID's being created on the headings, I am using:
anchor = anchor.replace(/([~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\/? ])+/g, '-').replace(/^(-)+|(-)+$/g,'');

The test string I am testing is:
test page ( { !@#$%^&* }) +- blah |\ <>?/ -- = _àáaâæãåā çćč èéêëēėę îïíīįì some test text ôöòóœøōõ ûüùúū ł ñń ßśš ÿ źžż

And the expected result from both this JS and the drupal transliteration should be:
test-page-blah-aaaaaeaaa-ccc-eeeeeee-iiiiii-some-test-text-oooooeooo-uuuuu-l-nn-ssss-y-zzz

