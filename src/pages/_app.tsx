import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";

import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/nextjs-router";
import { ThemedLayoutV2, RefineThemes } from "@refinedev/mantine";
import { MantineProvider, Global } from "@mantine/core";
import { MantineInferencer } from "@refinedev/inferencer/mantine";

const App: AppType = ({ Component, pageProps }) => {
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
        ]}
      >
        <ThemedLayoutV2>
          <Component {...pageProps} />
          {/*<MantineInferencer />*/}
        </ThemedLayoutV2>
      </Refine>
    </MantineProvider>
  );
};

export default api.withTRPC(App);
