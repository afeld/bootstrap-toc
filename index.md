---
layout: default
permalink: /
---

# Bootstrap Table of Contents plugin
{: .page-header}

[![Build Status](https://travis-ci.org/afeld/bootstrap-toc.svg?branch=gh-pages)](https://travis-ci.org/afeld/bootstrap-toc)

This [Bootstrap](http://getbootstrap.com/) plugin allows you to generate a table of contents for any page, based on the heading elements (`<h1>`, `<h2>`, etc.). It is meant to emulate the sidebar you see on [the Bootstrap documentation site](http://getbootstrap.com/css/).

This page is an example of the plugin in action – the table of contents you see on the left was automatically generated, without having to manually keep all of the navigation items in sync with the headings.

## Usage

On top of the normal Bootstrap setup (see their [Getting Started](http://getbootstrap.com/getting-started/) guide), you will need to include [`bootstrap-toc.css`](bootstrap-toc.css) and [`bootstrap-toc.js`](bootstrap-toc.js). Download them from [here](https://github.com/afeld/toc). Here's the order the files need to be loaded on the page:

{% highlight html %}
<link rel="stylesheet" href="bootstrap.min.css">
<link rel="stylesheet" href="bootstrap-toc.css">
<script src="jquery.min.js"></script>
<script src="bootstrap.min.js"></script>
<script src="bootstrap-toc.js"></script>
{% endhighlight %}

Then, pick one of the two options below.

### Via data attributes

Create a `<nav>` element with a `data-toggle="toc"` attribute.

{% highlight html %}
<nav id="toc" data-toggle="toc"></nav>
{% endhighlight %}

You can put this wherever on the page you like. Since this plugin leverages Bootstrap's [Scrollspy](http://getbootstrap.com/javascript/#scrollspy) plugin, you will also need to add a couple attributes to the `<body>`:

{% highlight html %}
<body data-spy="scroll" data-target="#toc">
{% endhighlight %}

### Via JavaScript

*Note: More advanced.*

If you prefer to create your navigation element another way (e.g. within single-page apps), you can pass a jQuery object into `Toc.init()`.

{% highlight javascript %}
$(function() {
  var $myNav = $('...');
  Toc.init($myNav);
  $('body').scrollspy({
    target: $myNav
  });
});
{% endhighlight %}

See the [Scrollspy](http://getbootstrap.com/javascript/#scrollspy) documentation for more information about initializing that plugin.

## Layout

This plugin isn't opinionated about where it should be placed on the page, but a common use case is to have the table of contents created as a "sticky" sidebar. We will leverage the [Affix](http://getbootstrap.com/javascript/#affix) plugin for this, and wrap the `<nav>` element in a `<div>` with a Bootstrap column class (see information about the [Grid](http://getbootstrap.com/css/#grid)). As an example putting it all together (similar to this page):

{% highlight html %}
<body data-spy="scroll" data-target="#toc">
  <div class="container">
    <div class="row">
      <!-- sidebar, which will move to the top on a small screen -->
      <div class="col-sm-4">
        <nav id="toc" data-spy="affix" data-toggle="toc"></nav>
      </div>
      <!-- main content area -->
      <div class="col-sm-8">
        ...
      </div>
    </div>
  </div>
</body>
{% endhighlight %}

You may also want to include this in your stylesheet:

{% highlight css %}
/* override the Affix plugin so that the navigation isn't sticky on small screens */
@media (max-width: 768px) {
  .affix {
    position: static;
  }
}
{% endhighlight %}

## See also

* [Bootstrap Docs Sidebar example](https://jsfiddle.net/gableroux/S2SMK/)
* [Tocify plugin](http://gregfranko.com/jquery.tocify.js/)
* [TOC plugin](http://projects.jga.me/toc/)

## Contributing

Questions, feature suggestions, and bug reports/fixes welcome!

### Manual testing

1. Run `bundle`.
1. Run `bundle exec jekyll serve`.
1. Open the various test templates:
    * [H2's](http://localhost:4000/test/templates/h2s.html)
    * [Markdown](http://localhost:4000/test/templates/markdown.html)
    * [No IDs](http://localhost:4000/test/templates/no-ids.html)

### Automated testing

1. Run `npm install`.
1. Run `gulp test` (command-line), or `open test/index.html` (browser).
