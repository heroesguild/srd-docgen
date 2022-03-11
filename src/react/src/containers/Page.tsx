import * as React from "react";
import { useRouteData } from "react-static";
import parse from "html-react-parser";
// import { PageView } from "../components";
// import { SphinxPage, GlobalData } from "../sphinx";

// interface PageData {
// data: SphinxPage;
// titles: { [id: string]: string };
// context: GlobalData;
// }

// const Page = () => {
const Page = () => {
  const { data } = useRouteData();
  console.log(data);
  return <div>{parse(data.body)}</div>;
  // return <h1>PAGE!!</h1>;
  // return <>{parse(data.body)}</>;
  // return <PageView data={props.data} titles={props.titles} context={props.context} />
};

export default Page;
