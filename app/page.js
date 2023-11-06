"use client"

import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import styles from './page.module.css'
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const [agencies, setAgencies] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  async function getAgencies() {
    try {
      const postData = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/dataconn`,
        postData
      );

      console.log("URL BEING USED:" + process.env.NEXT_PUBLIC_URL)
      if (!res.ok) {
        throw new Error(`API request failed with status ${res.status}`);
      }

      const response = await res.json();
      console.log("API Response:", response);
      setAgencies(response.adoptionagency); // Update state with the correct table name
      setIsLoading(false); // Set loading state to false
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false); // loading state is set to false in case of an error
    }
  }

  useEffect(() => {
    getAgencies();
  }, []);

  const onApplyClick = () => {
    console.log("apply button clicked")
    router.push("/application")
  }

  return (
    <div className={styles.container}>
      
      <div className={styles.backgroundImage}>
        <h1 className={styles.insideText}>Welcome to Kulaabhooshanam!</h1>
      </div>
      <div className={styles.pText}>
      <p>
        Building relationships, one family at a time.  
      </p>
        <hr className={styles.hrElement}/>
      </div>

      {/* Stats */}
      <div className={styles.greenStats}>
        <p>
        <span className={styles.statNumber}>21,000</span> 
        children are now part of permanent families!
        </p>
      </div>

      {/* cards */}
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <div className={styles.cardContent}>
            <span className={styles.cardContentHeader}>Who we help?</span> 
            <p>Many babies are left at public spaces, and our volunteers bring us babies found abandoned. Many of the infants who survive are very fragile and/or premature and require hospitalisation and intensive care. <br/>
            Our adoption process finds loving families for those unwanted and we’re with them every step of the way ensuring a safe and smooth transition to their new home.</p>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardContent}>
          <span className={styles.cardContentHeader}>How can you help?</span> 
            <p>Help us to ensure no baby is left abandoned and unloved. Volunteer your time and skills to support our programs and events. Your involvement can help create positive experiences for children and families. Help us raise awareness about the importance of adoption. Share our stories, events, and resources with your friends and community
            </p>
          </div>
        </div>
      </div>

      <div className={styles.centerButtonContainer}>
        <button className={styles.applyNowBtn} onClick={() => onApplyClick()}>Apply Now</button>
      </div>
      <div className={styles.giveUpChild}>
        <Link href={"/give-up"}> 
        <p>Want to give up a child for adoption?</p>
        </Link>
      </div>
      


      {/* Display the fetched data */}
      <div>
      <h2>Read Adoption Agencies</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : agencies.length > 0 ? (
        agencies.map((item, index) => {
          return (
            <div key={item.agency_id}>
              <span>agency_id</span>: {item.agency_id} 
              <span>name</span>: {item.agency_name} <br />
              <span>location</span>: {item.location} <br />
              <span>contacts</span>: {item.email_id} 
            </div>
          );
        })
      ) : (
        <p>No agencies to display.</p>
      )}
      </div>
    </div>
  )
}
