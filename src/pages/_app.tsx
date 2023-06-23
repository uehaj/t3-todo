import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";

import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/nextjs-router";

const App: AppType = ({ Component, pageProps }) => {
  return (
    <Refine
      options={{ disableTelemetry: true }}
      dataProvider={dataProvider("http://localhost:3000/api")}
      routerProvider={routerProvider}
      resources={[
        {
          name: "todo",
          list: "/todo",
          show: "/todo/show/:id",
        },
      ]}
    >
      {/*      <Layout>*/}
      <Component {...pageProps} />
      {/*      </Layout>*/}
    </Refine>
  );
};

export default api.withTRPC(App);
