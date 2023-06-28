import { AppProps, type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/nextjs-router";
import { ThemedLayoutV2, RefineThemes } from "@refinedev/mantine";
import { MantineProvider, Global } from "@mantine/core";
import { MantineInferencer } from "@refinedev/inferencer/mantine";

const App: AppType = ({ Component, pageProps, router }: AppProps) => {
  if (router.pathname === "/TodoApp") {
    return (
      <div>
        <Component {...pageProps} />
        <ReactQueryDevtools />
      </div>
    );
  }
  return (
    <MantineProvider
      theme={{ colorScheme: "dark" }}
      withNormalizeCSS
      withGlobalStyles
    >
      <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
      <Refine
        options={{ disableTelemetry: true }}
        dataProvider={dataProvider("http://localhost:3000/api")}
        routerProvider={routerProvider}
        resources={[
          {
            name: "todo",
            list: "/todo",
            show: "/todo/show/:id",
            create: "/todo/create",
            edit: "/todo/edit/:id",
            meta: {
              canDelete: true,
            },
          },
          {
            name: "contract",
            list: "/contract",
            show: "/contract/show/:id",
            create: "/contract/create",
            edit: "/contract/edit/:id",
            meta: {
              canDelete: true,
            },
          },
          {
            name: "user",
            list: "/user",
            show: "/user/show/:id",
            create: "/user/create",
            edit: "/user/edit/:id",
            meta: {
              canDelete: true,
            },
          },
        ]}
      >
        <ThemedLayoutV2>
          {router.pathname}
          {(() => {
            if (
              router.pathname === "/" ||
              router.pathname === "/todo" ||
              router.pathname === "/todo/create" ||
              router.pathname.startsWith("/todo/edit") ||
              router.pathname === "/contract" ||
              router.pathname === "/user" ||
              router.pathname.startsWith("/user/create") ||
              router.pathname.startsWith("/user/edit") ||
              router.pathname.startsWith("/user/show")
            ) {
              return <Component {...pageProps} />;
            }
            return <MantineInferencer />;
          })()}
        </ThemedLayoutV2>
      </Refine>
    </MantineProvider>
  );
};

export default api.withTRPC(App);
