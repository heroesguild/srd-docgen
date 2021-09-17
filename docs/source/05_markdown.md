---
title: Markdown & MyST, Style Guide
---

# Markdown & MyST, Style Guide

We're using the fully-Sphinx-supported [MyST](https://myst-parser.readthedocs.io/en/latest/index.html) in order to have the simplicity of Markdown with all the functionality of ReStructuredText. 

Here are some best practices we've found for this project's use case.

## ReST Roles & Directives

As a general rule of thumb, 
- anything that ReStructuredText would use inline [Roles](https://www.sphinx-doc.org/en/master/usage/restructuredtext/roles.html) for (in our case: terms, index entries, references, etc.), we use [MyST's role format](https://myst-parser.readthedocs.io/en/latest/syntax/syntax.html#roles-an-in-line-extension-point)
- anything that ReStructuredText would use [Directives](https://www.sphinx-doc.org/en/master/usage/restructuredtext/directives.html) for (in our case, table of contents, notes, warnings, etc.) we use [MyST's directives format](https://www.sphinx-doc.org/en/master/usage/restructuredtext/directives.html)

Examples specific to our use case follow. 

## Roles with Different Text

If a role is used to link to a reference (a term or index below) and the text we want to display is different than the exact reference text, we put our reference text in brackets:

```
We want to use the plural {term}`indices<index>` even though the exact term is "index". 
```

We want to use the plural {term}`indices<index>` even though the exact term is index.

## Terms

In order to have a term hyperlink to its corresponding glossary entry, we use :

```
This will link the user to the glossary entry for the term {term}`index`.
```

This will link the user to the glossary entry for the term {term}`index`.

```{note} 
- this will not create an page entry in the index. 
- see {ref}`Roles with Different Text` above if the text you want to appear doesn't exactly match the term's text
```

## Index

In order to have a phrase show up in the {term}`index`, we use:

```
To make the word "term" show up in the index with a link to this page, use {index}`term`.
```

To make the word "term" show up in the index with a link to this page, use {index}`term`.

```{note}
- the word term does not link to anything here
- this will append a page entry in the index on the PDF output that links back here
- see {ref}`Roles with Different Text` above if the text you want to appear doesn't exactly match the index entry's text
```