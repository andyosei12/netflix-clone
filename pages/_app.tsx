import { useEffect, useState } from "react";
import { magic } from "../lib/magic-client";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import Loading from "../components/loading/Loading";

function MyApp({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getIsUserLoggedIn = async () => {
      const isLoggedIn = await magic.user.isLoggedIn();
      if (isLoggedIn) {
        router.push("/");
      } else {
        router.push("/login");
      }
    };
    getIsUserLoggedIn();
  }, []);

  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false);
    };
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return isLoading ? <Loading /> : <Component {...pageProps} />;
}

export default MyApp;
