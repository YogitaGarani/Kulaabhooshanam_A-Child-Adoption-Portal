"use client"

import Link from "next/link";
import React from "react"
import styles from "../styles/header.module.css";

const Header = () => {
    return (
        <div className={styles.header}>
            <div>
                <h2><em>Kulaabhooshanam.</em></h2>
            </div>
            <nav className={styles.navContainer}>
                <Link href={"/"}>Home</Link>
                <Link href={"/about"}>About</Link>
                <Link href={"/login"}>Login</Link>
            </nav>
        </div>
    )
}

export default Header;