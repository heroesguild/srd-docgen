# Configuration file for the Sphinx documentation builder.
#
# This file only contains a selection of the most common options. For a full
# list see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Path setup --------------------------------------------------------------

# If extensions (or modules to document with autodoc) are in another directory,
# add these directories to sys.path here. If the directory is relative to the
# documentation root, use os.path.abspath to make it absolute, like shown here.
#
# import os
# import sys
# sys.path.insert(0, os.path.abspath('.'))


# -- Project information -----------------------------------------------------

project = 'SRD DOCGEN'
copyright = '2021, Keith R. Potempa'
author = 'Keith R. Potempa'

# The full version, including alpha/beta/rc tags
release = '0.1'


# -- General configuration ---------------------------------------------------

# Add any Sphinx extension module names here, as strings. They can be
# extensions coming with Sphinx (named 'sphinx.ext.*') or your custom
# ones.
extensions = ["myst_parser"]

# Add any paths that contain templates here, relative to this directory.
templates_path = ['_templates']

# List of patterns, relative to source directory, that match files and
# directories to ignore when looking for source files.
# This pattern also affects html_static_path and html_extra_path.
exclude_patterns = []


# -- Options for HTML output -------------------------------------------------

# The theme to use for HTML and HTML Help pages.  See the documentation for
# a list of builtin themes.
#
html_theme = "sphinx_book_theme"

# Add any paths that contain custom static files (such as style sheets) here,
# relative to this directory. They are copied after the builtin static files,
# so a file named "default.css" will overwrite the builtin "default.css".
html_static_path = ['_static']

# -- Options for LaTeX output -------------------------------------------------

# -- DND TEMPLATE LATEX -------------------------------------------------------
# latex_elements = {
#     # The paper size ('letterpaper' or 'a4paper').
#     #
#     # 'papersize': 'letterpaper',

#     # The font size ('10pt', '11pt' or '12pt').
#     #
#     'pointsize': '10pt',

#     'preamble': r'''
#         \usepackage[layout=true]{dnd}
#     ''',
    
#     # Extra classes used by external dnd template package 
#     'extraclassoptions': 'twoside, twocolumn, openany',
# }

# -- MEDIEVAL TEMPLATE LATEX ----------------------------------------------------
latex_additional_files = ["medieval_template.sty"]
latex_elements = {
    # The paper size ('letterpaper' or 'a4paper').
    #
    # 'papersize': 'letterpaper',

    # Extra classes used by external dnd template package 
    'extraclassoptions': 'twoside, english',


    # The font size ('10pt', '11pt' or '12pt').
    #
    'pointsize': '12pt',

    # Using this local style package 
    # 
    'preamble': r'\usepackage{medieval_template}',

    # TODO: fncychap is styling the chapters; making them look strange 
    # 
    'fncychap': '',
}

# Grouping the document tree into LaTeX files. List of tuples
# (source start file, target name, title,
#  author, documentclass [howto, manual, or own class]).
# latex_documents = [
#     (root_doc, 'test.tex', u'test Documentation',
#      u'test', 'manual'),
# ]

# The name of an image file (relative to this directory) to place at the top of
# the title page.
#
# latex_logo = None

# If true, show page references after internal links.
#
latex_show_pagerefs = True

# If true, show URL addresses after external links.
#
# latex_show_urls = False

# Documents to append as an appendix to all manuals.
#
# latex_appendices = []

# If false, no module index is generated.
#
# latex_domain_indices = True
