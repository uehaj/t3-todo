import { type AppType } from "next/app";
import { api } from "~/utils/api";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect } from "react";
import "~/styles/globals.css";
import { QueryClientProvider, useQueryClient } from "@tanstack/react-query";

const MyApp: AppType = ({ Component, pageProps }) => {
  useEffect(() => {
    const body = document.body;
    body.setAttribute("data-theme", "garden");
  }, []);
  const queryClient = useQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default api.withTRPC(MyApp);
