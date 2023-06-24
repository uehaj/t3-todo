import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/nextjs-router";
import { ThemedLayoutV2, RefineThemes } from "@refinedev/mantine";
import { MantineProvider, Global } from "@mantine/core";
import { MantineInferencer } from "@refinedev/inferencer/mantine";

const App: AppType = ({ Component, pageProps, router }) => {
  if (router.pathname === "/TodoApp") {
    return (
      <div>
        <Component {...pageProps} />
        <ReactQueryDevtools />
      </div>
    );
  }
  console.log(`>>>`, JSON.stringify(router.pathname));
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
            name: "todo",
            list: "/todo",
            show: "/todo/show/:id",
            create: "/todo/create",
            edit: "/todo/edit/:id",
            meta: {
              canDelete: true,
            },
          },
        ]}
      >
        <ThemedLayoutV2>
          {(() => {
            if (router.pathname.startsWith("/todo")) {
              if (router.pathname === "/todo") {
                return <Component {...pageProps} />;
              }
            }
            return <MantineInferencer />;
          })()}
        </ThemedLayoutV2>
      </Refine>
    </MantineProvider>
  );
};

export default api.withTRPC(App);
