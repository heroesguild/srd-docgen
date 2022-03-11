import path from "path";
import find from "find";
import fs from "fs";

const removeFjsonExtension = (fileName) => {
  return fileName.slice(0, fileName.length - 6);
};

/** Checks if a page is a 'normal' user-created page (is not an index, glossary, search page, etc) */
const isNormalPage = (fileName, pageBody, pageTitle) => {
  const nonNormalNames = [
    "index.fjson",
    "genindex.fjson",
    "glossary.fjson",
    "globalcontext.fjson",
    "search.fjson",
  ];

  if (nonNormalNames.includes(fileName)) {
    return false;
  }

  return pageBody && pageTitle;
};

/**
 * Loops over every page file name, opens that file, converts its contents into an object, then
 * returns 1) a map of all of those json objects and 2) a dictionary of file names to page titles
 */
const buildMap = (pageFileNames, jsonBuildDir) => {
  // We will build a map that maps page -> JSON data in each file as well as
  // a map of titles that map the URL (id) for a given page to a string (the title)
  // First though, we initialize these maps.

  /* 
      TODO: Type from example:
    '01_introduction.fjson': {
        parents: [],
        prev: { link: '../', title: 'Welcome to the SRD DOCGEN documentation!' },
        next: { link: '../02_getting_started/', title: 'Local Dev' },
        title: 'Introduction',
        meta: { wordcount: [Object], title: 'Introduction' },
        body: '<div class="tex2jax_ignore mathjax_ignore section" id="introduction">\n' +
          '<h1>Introduction<a class="headerlink" href="#introduction" title="Permalink to this headline">¶</a></h1>\n' +
          '</div>\n',
        metatags: '',
        rellinks: [ [Array], [Array], [Array] ],
        sourcename: '01_introduction.md.txt',
        toc: '<ul>\n' +
          '<li><a class="reference internal" href="#">Introduction</a></li>\n' +
          '</ul>\n',
        display_toc: false,
        page_source_suffix: '.md',
        current_page_name: '01_introduction',
        sidebars: [
          'sidebar-logo.html',
          'search-field.html',
          'sbt-sidebar-nav.html',
          'sbt-sidebar-footer.html'
        ],
        customsidebar: null,
        alabaster_version: '0.7.12',
        pagetitle: 'Introduction',
        page_description: 'Introduction',
        author: 'Keith R. Potempa',
        theme_search_bar_text: 'Search the docs ...',
        theme_show_toc_level: 1
      },
      '02_getting_started.fjson': {
        parents: [],
        prev: { link: '../01_introduction/', title: 'Introduction' },
        next: { link: '../03_html/', title: 'Building HTML' },
        title: 'Local Dev',
        meta: { wordcount: [Object], title: 'Getting Started' },
        body: '<div class="section" id="local-dev">\n' +
          '<h1>Local Dev<a class="headerlink" href="#local-dev" title="Permalink to this headline">¶</a></h1>\n' +
          '<ol>\n' +
          '<li><p>Clone project</p>\n' +
          '<div class="highlight-default notranslate"><div class="highlight"><pre><span></span>git clone git@github.com:keithrpotempa/srd-docgen.git &amp;&amp; cd $_\n' +
          '</pre></div>\n' +
          '</div>\n' +
          '</li>\n' +
          '<li><p>Make python virtual environment:</p>\n' +
          '<div class="highlight-default notranslate"><div class="highlight"><pre><span></span><span class="n">python3</span> <span class="o">-</span><span class="n">m</span> <span class="n">venv</span> <span class="o">.</span><span class="n">venv</span>\n' +
          '</pre></div>\n' +
          '</div>\n' +
          '</li>\n' +
          '<li><p>Activate it:</p>\n' +
          '<div class="highlight-default notranslate"><div class="highlight"><pre><span></span><span class="n">source</span> <span class="o">.</span><span class="n">venv</span><span class="o">/</span><span class="nb">bin</span><span class="o">/</span><span class="n">activate</span>\n' +
          '</pre></div>\n' +
          '</div>\n' +
          '</li>\n' +
          '<li><p>Install required pip packages:</p>\n' +
          '<div class="highlight-default notranslate"><div class="highlight"><pre><span></span><span class="n">python3</span> <span class="o">-</span><span class="n">m</span> <span class="n">pip</span> <span class="n">install</span> <span class="o">-</span><span class="n">r</span> <span class="n">requirements</span><span class="o">.</span><span class="n">txt</span>\n' +
          '</pre></div>\n' +
          '</div>\n' +
          '</li>\n' +
          '</ol>\n' +
          '</div>\n' +
          '<div class="section" id="customizing-build">\n' +
          '<h1>Customizing Build<a class="headerlink" href="#customizing-build" title="Permalink to this headline">¶</a></h1>\n' +
          '<p>To customize, edit LaTeX, HTML options in <code class="docutils literal notranslate"><span class="pre">conf.py</span></code> file.</p>\n' +
          '<p>See options reference <a class="reference external" href="https://www.sphinx-doc.org/en/master/usage/configuration.html">here</a>.</p>\n' +
          '</div>\n' +
          '<div class="section" id="deploying-to-netlify">\n' +
          '<h1>Deploying to Netlify<a class="headerlink" href="#deploying-to-netlify" title="Permalink to this headline">¶</a></h1>\n' +
          '<ul class="simple">\n' +
          '<li><p>Link your github repo to a Netlify site</p></li>\n' +
          '<li><p>Build Settings:</p>\n' +
          '<ul>\n' +
          '<li><p>Build Command: eg: <code class="docutils literal notranslate"><span class="pre">cd</span> <span class="pre">docs</span> <span class="pre">&amp;&amp;</span> <span class="pre">make</span> <span class="pre">html</span></code></p>\n' +
          '<ul>\n' +
          '<li><p>Navigate into the directory where your project’s <code class="docutils literal notranslate"><span class="pre">MakeFile</span></code> is located</p></li>\n' +
          '<li><p>Build the html</p></li>\n' +
          '</ul>\n' +
          '</li>\n' +
          '<li><p>Publish Directory: eg: <code class="docutils literal notranslate"><span class="pre">docs/build/html</span></code></p>\n' +
          '<ul>\n' +
          '<li><p>The directory where your html outputs to</p></li>\n' +
          '</ul>\n' +
          '</li>\n' +
          '</ul>\n' +
          '</li>\n' +
          '</ul>\n' +
          '</div>\n',
        metatags: '',
        rellinks: [ [Array], [Array], [Array] ],
        sourcename: '02_getting_started.md.txt',
        toc: '<ul>\n' +
          '<li><a class="reference internal" href="#">Local Dev</a></li>\n' +
          '<li><a class="reference internal" href="#customizing-build">Customizing Build</a></li>\n' +
          '<li><a class="reference internal" href="#deploying-to-netlify">Deploying to Netlify</a></li>\n' +
          '</ul>\n',
        display_toc: true,
        page_source_suffix: '.md',
        current_page_name: '02_getting_started',
        sidebars: [
          'sidebar-logo.html',
          'search-field.html',
          'sbt-sidebar-nav.html',
          'sbt-sidebar-footer.html'
        ],
        customsidebar: null,
        alabaster_version: '0.7.12',
        pagetitle: 'Local Dev',
        page_description: 'Local Dev  Clone project  git clone git@github.com:keithrpotempa/srd-docgen.git && cd $_   Make python virtual environment:  python3 -m venv .venv   Activate it',
        author: 'Keith R. Potempa',
        theme_search_bar_text: 'Search the docs ...',
        theme_show_toc_level: 1
      },
    */
  const pageMap = {};

  /*
        TODO: type based on example:
        {
          '01_introduction': 'Introduction',
          '02_getting_started': 'Local Dev',
          '03_html': 'Building HTML',
          '04_pdf': 'Building PDFs',
          '05_markdown': 'Markdown &amp; MyST, Style Guide',
          genindex: undefined,
          glossary: 'Glossary',
          search: undefined
        }
      */
  const pageTitlesDict = {};

  pageFileNames.forEach((pageFileName) => {
    // Slice off the file's extension (.fjson) -- this is the URL that Sphinx uses to refer to that page
    const pageSlug = removeFjsonExtension(pageFileName);
    // Build path relative to current directory
    const pageFilePath = path.join(jsonBuildDir, pageFileName);

    try {
      // Parse the contents of the file as JSON
      const pageObj = JSON.parse(fs.readFileSync(pageFilePath).toString());

      // Store away the data from the file and the title
      pageMap[pageFileName] = pageObj;
      pageTitlesDict[pageSlug] = pageObj.title;
    } catch (e) {
      console.error("Error processing page " + pageFileName);
      console.error(e);
    }
  });

  return { pageMap, pageTitlesDict };
};

export function getDocRoutes(rootDir) {
  return async ({ dev, body, title }) => {
    // Construct path to build/json directory produced by Sphinx
    // TODO: more elegant
    const jsonBuildDir = path.join(
      rootDir,
      "..",
      "sphinx",
      "docs",
      "build",
      "json"
    );

    // Find all Sphinx-built .fjson file paths, put them in an array
    const fjsonFilePaths = await new Promise((resolve) => {
      find.file(/\.fjson$/, jsonBuildDir, (files) => {
        resolve(files);
      });
    });

    // Strip off absolute path and only keep the filenames
    const pageFileNames = fjsonFilePaths.map((f) =>
      f.slice(jsonBuildDir.length + 1)
    );

    // Map contents of all pages, create a dictionary of page file names to page titles
    const { pageMap, pageTitlesDict } = buildMap(pageFileNames, jsonBuildDir);

    // Handle the root as a special case
    const root = {
      path: "/",
      template: "src/containers/Root",
      // getProps: () => ({
      //   page: map["/index.fjson"],
      //   sponsors: sponsors,
      //   context: context,
      // }),
    };

    const normalPages = pageFileNames
      .filter((pageFileName) =>
        isNormalPage(
          pageFileName,
          pageMap[pageFileName],
          pageTitlesDict[removeFjsonExtension(pageFileName)]
        )
      )
      .map((pageFileName) => {
        return {
          path: removeFjsonExtension(pageFileName),
          template: "src/containers/Page",
          // getProps: () => ({
          //   data: map[page],
          //   titles: titles,
          //   context: context,
          // }),
        };
      });

    // If we aren't in dev model, rebuild the search index and write it into
    // dist/lunr.json
    // if (!dev) {
    //   genDebug("Building index");

    //   // Create the index
    //   let index = lunr(function () {
    //     // Specify the fields in the index
    //     this.field("id");
    //     this.field("title");
    //     this.field("body");

    //     genDebug("  Pages to index: %o", normal);
    //     normal.forEach((page) => {
    //       // Invoke the getProps method for this page and extract the data
    //       // field (this is SphinxData)
    //       let obj = page.getProps().data;
    //       genDebug("    Indexing %s", obj.title);
    //       // TODO: Pre-filter this
    //       if (obj.title && obj.body) {
    //         let doc = {
    //           id: page.path,
    //           body: obj.body,
    //           title: obj.title,
    //         };
    //         this.add(doc);
    //       } else {
    //         genDebug("      Missing title or body: %o", obj);
    //       }
    //     });
    //   });

    //   genDebug(
    //     "Search for 'equation' yielded %s hits",
    //     index.search("equation").length
    //   );

    //   // We need to write to 'dist' because 'public' has already been copied.
    //   fs.writeFile(
    //     path.join("dist", "lunr.json"),
    //     JSON.stringify(index.toJSON()),
    //     (err) => {
    //       if (err) console.error(err);
    //     }
    //   );
    // }

    // let index = [];
    // if (map.hasOwnProperty("/genindex.fjson")) {
    //   index.push({
    //     path: "/genindex",
    //     component: "src/containers/IndexPage",
    //     getProps: () => ({
    //       index: map["/genindex.fjson"],
    //       titles: titles,
    //       ncol: 4,
    //     }),
    //   });
    //   genDebug("  Found index");
    // } else {
    //   console.warn("No index file found!");
    // }

    // genDebug("# of normal pages: %j", normal.length);

    return [
      root,
      ...normalPages,
      // ...index,
    ];
  };
}
