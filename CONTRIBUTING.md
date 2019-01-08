Hi there—thanks for being interested in contributing! For starters, all questions, feature suggestions, and bug reports/fixes are welcome. That being said, some goals of this plugin are to stay simple/small, "just work", and not require a lot of configuration, so please don't be offended if any feature requests are politely declined. For any feature/configuration additions, you might want to open an issue explaining the idea first before going through the trouble of implementing it.

## Manual testing

1. Run `bundle`.
1. Run `bundle exec jekyll serve`.
1. Open the various test templates:
   - [`<h2>`s](http://localhost:4000/bootstrap-toc/test/templates/h2s.html)
   - [Markdown](http://localhost:4000/bootstrap-toc/test/templates/markdown.html)
   - [No IDs](http://localhost:4000/bootstrap-toc/test/templates/no-ids.html)

## Automated testing

1. Run `npm install`.
1. Run `gulp test`/`gulp watch` (command-line), or `open test/index.html` (browser).

You can find the tests in [`test/toc-test.js`](test/toc-test.js).

## Pull request guidelines

- Keep the pull request small, and narrowly scoped (one bug fix, one feature, etc.)
- The [`dist/`](dist/) directory contains the latest released version of the plugin, so please make any code changes in [`bootstrap-toc.js`](bootstrap-toc.js) and [`bootstrap-toc.css`](bootstrap-toc.css) _only_.
- Don't update the `dist/` directory, bump the version, etc...these will be done by the maintainer(s) as part of a release.
- Add/update [tests](test/toc-test.js) for functionality changes, additions, or fixes.
- Update [the documentation](index.md) for any functionality changes/additions.
- Files should be formatted using [Prettier](https://prettier.io/).

Thanks!
