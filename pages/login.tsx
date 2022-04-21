import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "../styles/Login.module.css";
import { magic } from "../lib/magic-client";

const Login: React.FC = () => {
  const [userMsg, setUserMsg] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleOnChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserMsg("");
    setEmail(e.target.value);
  };

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

  const loginWithEmailHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email) {
      setIsLoading(true);
      if (email === "nanaosei2089@gmail.com") {
        // log in a user by their email
        try {
          const didToken = await magic.auth.loginWithMagicLink({ email });
          if (didToken) {
            console.log(didToken);
            router.push("/");
          }
        } catch (error) {
          // Handle errors if required!
          setIsLoading(false);
          console.error("Something went wrong logging in", error);
        }
      } else {
        setUserMsg("Something went wrong logging in");
        setIsLoading(false);
      }
    } else {
      setUserMsg("Enter a valid email address");
    }
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix SignIn</title>
      </Head>

      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <Link href="/">
            <a className={styles.logoLink}>
              <div className={styles.logoWrapper}>
                <Image
                  src={"/static/netflix.svg"}
                  alt="netflix logo"
                  width="128px"
                  height="34px"
                />
              </div>
            </a>
          </Link>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signinHeader}>Sign In</h1>
          <input
            type="email"
            placeholder="Email address"
            className={styles.emailInput}
            onChange={handleOnChangeEmail}
          />
          <p className={styles.userMsg}>{userMsg}</p>
          <button onClick={loginWithEmailHandler} className={styles.loginBtn}>
            {isLoading ? "Loading.." : "Sign In"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
