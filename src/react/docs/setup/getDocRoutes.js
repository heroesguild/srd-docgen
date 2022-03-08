import path from "path";
import find from "find";

// const isNormal = (name: string, data: any) => {
//   if (name === "index.fjson") {
//     return false;
//   }
//   if (name === "globalcontext.fjson") {
//     return false;
//   }
//   if (name === "search.fjson") {
//     return false;
//   }
//   let ret = data.hasOwnProperty("body") && data.hasOwnProperty("title");

//   return ret;
// };

export function getDocRoutes (rootDir) {

  return async ({dev}) => {

    // Construct path to build/json directory produced by Sphinx
    // TODO: more elegant
    const jsonDir = path.join(rootDir, "..", "sphinx", "docs", "build", "json");
  
    // // Find all .fjson files
    const results = await new Promise((resolve) => {
      find.file(/\.fjson$/, jsonDir, (files) => {
        resolve(files);
      });
    });
  
    console.error(results);
  
    return [];
  
    // Strip off absolute path and only keep the bits relative to the 'json' directory
    // const pages = results
    //   .filter((f) => f.length > jsonDir.length)
    //   .map((f) => f.slice(jsonDir.length));
  }
};
