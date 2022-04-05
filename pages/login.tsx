import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "../styles/Login.module.css";

const Login: React.FC = () => {
  const [userMsg, setUserMsg] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  const handleOnChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserMsg("");
    setEmail(e.target.value);
  };

  const loginWithEmailHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (email) {
      if (email === "nanaosei2089@gmail.com") {
        router.push("/");
      } else {
        setUserMsg("Something went wrong logging in");
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
            Sign In
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
