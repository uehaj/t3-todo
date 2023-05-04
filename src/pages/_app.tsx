import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { useEffect } from "react";

const MyApp: AppType = ({ Component, pageProps }) => {
  useEffect(() => {
    const body = document.body;
    body.setAttribute("data-theme", "garden");
  }, []);
  return <Component {...pageProps} />;
};

export default api.withTRPC(MyApp);
