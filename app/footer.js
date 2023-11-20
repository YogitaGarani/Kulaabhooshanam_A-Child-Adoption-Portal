"use client"
import Link from "next/link";
import React from "react"
import styles from "../styles/footer.module.css";

const Footer = () => {
    return (
        <div className = {styles.footer}>
            <div className = {styles.navContainer}>
                <div className = {styles.footerColumn}>
                <ul>
                    <li><Link href = {"/"} className = {styles.link}>Home</Link></li>
                    <li><Link href = {"/about"} className = {styles.link}>About</Link></li>
                    <li><Link href = {"/guidelines"} className = {styles.link}>Guidelines</Link></li>
                </ul>
                </div>
                <div className = {styles.footerColumn}><ul>
                    <li><em><b>Contact us at:</b></em></li>
                    <li>Toll free help line no.<b>1800-11-1311</b></li>
                    <li>Available between 8:00 AM to 8:00 PM on all working days (Mon-Fri)</li>
                    <li><b>carahdesk.wcd@nic.in</b></li>
                </ul></div>
                <div className = {styles.footerColumn}><ul>
                    <li><b><em>Website owned and managed by:</em></b></li>
                    <li>Central Adoption Resource Agency</li>
                    <li>Ministy of Women and Child Development</li>
                    <li>Government of India</li>
                </ul></div>
            </div>
        </div>
    )
}

export default Footer;