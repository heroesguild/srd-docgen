import fs from "fs";

// TODO: swap when react-static 8 release TS support for static.config
// const removeFjsonExtension = (fileName: string) => {
/** Strips the extension from a filename */
export const removeExtension = (fileName) => {
  const [extension] = fileName.split(".").slice(-1);
  return fileName.slice(0, fileName.length - extension.length - 1);
};

export const parseFileContentsAsJSON = (filePath) => {
  return JSON.parse(fs.readFileSync(filePath).toString());
};

/** Checks if a page is a 'normal' user-created page (is not an index, glossary, search page, etc) */
// TODO: swap when react-static 8 release TS support for static.config
// const isNormalPage = (fileName: string) => {
export const isNormalPage = (fileName) => {
  const nonNormalNames = [
    "genindex.fjson", // TODO: genindex page requires its own custom component
    "globalcontext.json", // used as react context passed to all pages, but not made into a normal page
    "index.json",
    "search.fjson",
    "searchindex.json",
  ];

  if (nonNormalNames.includes(fileName)) {
    return false;
  }

  return true;
};
