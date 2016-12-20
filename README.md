# bootstrap-toc
An automatic table of contents generator, using Bootstrap 3

Adding a readme for this bootstrap-toc
For proper regex for the ID's being created on the headings, I am using:
anchor = anchor.replace(/([~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\/? ])+/g, '-').replace(/^(-)+|(-)+$/g,'');

The source for this was from:
http://stackoverflow.com/questions/18936483/regex-for-replacing-all-special-characters-and-spaces-in-a-string-with-hyphens
