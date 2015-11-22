---
layout: default
permalink: /
---

# Bootstrap Table of Contents plugin

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

### Via data attributes

TODO

### Via JavaScript

TODO

## Layout

TODO

## See also

* [Bootstrap Docs Sidebar example](https://jsfiddle.net/gableroux/S2SMK/)
* [Tocify plugin](http://gregfranko.com/jquery.tocify.js/)
* [TOC plugin](http://projects.jga.me/toc/)
