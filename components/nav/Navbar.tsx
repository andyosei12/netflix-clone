import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { magic } from "../../lib/magic-client";
import { useRouter } from "next/router";
import styles from "./Navbar.module.css";

const Navbar: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [userName, setUserName] = useState("");
  const router = useRouter();

  useEffect(() => {
    try {
      const getUserEmail = async () => {
        const { email } = await magic.user.getMetadata();

        if (email) {
          setUserName(email);
        }
      };
      getUserEmail();
    } catch (error) {
      //handle any errors
      console.log(error);
    }
  }, []);

  const handleOnClickHome = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/");
  };
  const handleOnClickMyList = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/browse/my-list");
  };

  const handleSignOut = async () => {
    try {
      await magic.user.logout();
    } catch (error) {
      console.log(error);
    } finally {
      router.push("login");
    }
  };

  const handleShowDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
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

        <ul className={styles.navItems}>
          <li className={styles.navItem} onClick={handleOnClickHome}>
            Home
          </li>
          <li className={styles.navItem2} onClick={handleOnClickMyList}>
            My List
          </li>
        </ul>
        <nav className={styles.navContainer}>
          <div className="">
            <button className={styles.usernameBtn} onClick={handleShowDropdown}>
              <p className={styles.username}>{userName}</p>
              {/* Expand more icon */}
              <Image
                src={"/static/expand_more.svg"}
                alt="expand more icon"
                width="24px"
                height="24px"
              />
            </button>

            {showDropdown && (
              <div className={styles.navDropdown}>
                <div>
                  <a onClick={handleSignOut} className={styles.linkName}>
                    Sign Out
                  </a>
                  <div className={styles.lineWrapper}></div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
