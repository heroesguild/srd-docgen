import path from "path";
import find from "find";
import fs from "fs";
// TODO: swap when react-static 8 release TS support for static.config
// import type { SphinxPage } from "../types";

// TODO: swap when react-static 8 release TS support for static.config
// type PageMap = Record<string, SphinxPage>;

// TODO: swap when react-static 8 release TS support for static.config
// const removeFjsonExtension = (fileName: string) => {
/** Strips the extension from a filename */
const removeExtension = (fileName) => {
  const [extension] = fileName.split(".").slice(-1);
  return fileName.slice(0, fileName.length - extension.length - 1);
};

/** Checks if a page is a 'normal' user-created page (is not an index, glossary, search page, etc) */
// TODO: swap when react-static 8 release TS support for static.config
// const isNormalPage = (fileName: string) => {
const isNormalPage = (fileName) => {
  const nonNormalNames = [
    "genindex.fjson",
    "glossary.fjson",
    "globalcontext.json",
    "index.json",
    "search.fjson",
    "searchindex.json",
  ];

  if (nonNormalNames.includes(fileName)) {
    return false;
  }

  return true;
};

/**
 * Loops over every page file name, opens that file, converts its contents into an object, then
 * returns 1) a map of all of those json objects and 2) a dictionary of file names to page titles
 */
// TODO: swap when react-static 8 release TS support for static.config
// const buildMap = (pageFileNames: string[], jsonBuildDir: string) => {
const buildMap = (pageFileNames, jsonBuildDir) => {
  // TODO: swap when react-static 8 release TS support for static.config
  // const pageMap: PageMap = {};
  const pageMap = {};

  /** 
   * A dictionary of page slugs to page titles 
   * eg: 
   * {
   *  '01_introduction': 'Introduction',
      '02_getting_started': 'Local Dev',
   * }
   * */

  // TODO: swap when react-static 8 release TS support for static.config
  // const pageTitlesDict: Record<string, string> = {};
  const pageTitlesDict = {};

  pageFileNames.forEach((pageFileName) => {
    // Slice off the file's extension -- this is the URL that Sphinx uses to refer to that page
    const pageSlug = removeExtension(pageFileName);

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

// TODO: swap when react-static 8 release TS support for static.config
// export function getDocRoutes(rootDir: string) {
export function getDocRoutes(rootDir) {
  // To revisit these variables
  // return async ({ dev, body, title }) => {
  return async () => {
    // Construct path to build/json directory produced by Sphinx
    const jsonBuildDir = path.join(
      rootDir,
      "..",
      "sphinx",
      "docs",
      "build",
      "json"
    );

    // Find all Sphinx-built .fjson file paths, put them in an array
    // TODO: swap when react-static 8 release TS support for static.config
    // const fjsonFilePaths: string[] = await new Promise((resolve) => {
    const fjsonFilePaths = await new Promise((resolve) => {
      find.file(/json$/, jsonBuildDir, (files) => {
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
      template: "src/containers/Page",
      getData: () => ({
        data: pageMap["index.json"],
        titles: pageTitlesDict,
      }),
    };

    const normalPages = pageFileNames
      .filter((pageFileName) => isNormalPage(pageFileName))
      .map((pageFileName) => {
        return {
          path: removeExtension(pageFileName),
          template: "src/containers/Page",
          getData: () => ({
            data: pageMap[pageFileName],
            titles: pageTitlesDict,
            // context: context,
          }),
        };
      });

    return [
      root,
      ...normalPages,
      // ...index,
    ];
  };
}
