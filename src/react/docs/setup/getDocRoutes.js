import path from "path";
import find from "find";
import fs from "fs";

const isNormal = (name, body, title) => {
  console.log("NAME", name);
  // console.log("BODY", body);
  console.log("TITLE", title);
  const nonNormalNames = [
    "/index.fjson",
    "/genindex.fjson",
    "/glossary.fjson",
    "/globalcontext.fjson",
    "/search.fjson",
  ];

  if (nonNormalNames.includes(name)) {
    return false;
  }

  return body && title;
};

export function getDocRoutes(rootDir) {
  return async ({ dev, body, title }) => {
    // Construct path to build/json directory produced by Sphinx
    // TODO: more elegant
    const jsonDir = path.join(rootDir, "..", "sphinx", "docs", "build", "json");

    // // Find all .fjson files
    const results = await new Promise((resolve) => {
      find.file(/\.fjson$/, jsonDir, (files) => {
        resolve(files);
      });
    });

    // Strip off absolute path and only keep the bits relative to the 'json' directory
    const pages = results
      .filter((f) => f.length > jsonDir.length)
      .map((f) => f.slice(jsonDir.length));

    // We will build a map that maps page -> JSON data in each file as well as
    // a map of titles that map the URL (id) for a given page to a string (the title)
    // First though, we initialize these maps.
    let map = {};
    let titles = {};

    // Loop over all pages
    pages.forEach((page) => {
      // This is the URL that Sphinx uses to refer to that page
      const href = page.slice(0, page.length - 6); //+ "/";
      // Build path relative to current directory
      const file = path.join(jsonDir, page);

      try {
        // Parse the contents of the file as JSON
        const obj = JSON.parse(fs.readFileSync(file).toString());

        // Store away the data from the file and the title
        map[page] = obj;
        titles[href] = obj.title;
      } catch (e) {
        console.error("Error processing page " + page);
        console.error(e);
      }
    });

    console.log("MAP", map);
    console.log("TITLES", titles);

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

    const normal = pages
      .filter((page) =>
        isNormal(page, map[page], titles[page.slice(0, page.length - 6)])
      )
      .map((page) => {
        console.error(page);
        return {
          path: page.slice(1, page.length - 6),
          template: "src/containers/Page",
          // getProps: () => ({
          //   data: map[page],
          //   titles: titles,
          //   context: context,
          // }),
        };
      });

    console.log("NORMAL: ", normal);

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
      ...normal,
      // ...index,
    ];
  };
}
