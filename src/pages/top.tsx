import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/nextjs-router";
import { AppProps } from "next/app";
import { NextPage } from "next";

//import { Layout } from "components/Layout";
const App: NextPage = () => {
  // export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Refine
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      routerProvider={routerProvider}
      resources={[
        {
          name: "posts",
          list: "/posts",
          show: "/posts/show/:id",
        },
        {
          name: "categories",
          list: "/categories",
          show: "/categories/show/:id",
        },
      ]}
    >
      {/*      <Layout>*/}
      {/*<Component {...pageProps} />*/}
      {/*      </Layout>*/}
    </Refine>
  );
};

export default App;
