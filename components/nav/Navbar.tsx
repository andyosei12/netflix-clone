import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./Navbar.module.css";

const Navbar: React.FC<{ userName: string }> = ({ userName }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const handleOnClickHome = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/");
  };
  const handleOnClickMyList = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/browse/my-list");
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
                  <Link href="/login">
                    <a className={styles.linkName}>Sign Out</a>
                  </Link>
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
