"use client"

import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import styles from './page.module.css'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { testimonials } from './testimonials';
import Script from 'next/script'

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

      if (!res.ok) {
        throw new Error(`API request failed with status ${res.status}`);
      }

      const response = await res.json();
      console.log("API Response:", response);
      setAgencies(response.adoptionagency); // Update state with the relevant agency table
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
    // console.log("apply button clicked")
    router.push("/application")
  }

// carousel settings for responsiveness
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 530 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 530, min: 0 },
      items: 1,
    },
  }

  // bot configs
  const initBotpress = () => {
    window.botpressWebChat.init({
      "composerPlaceholder": "Come say Hi!",
      "botConversationDescription": "The Kulaabhooshanam team is happy to help you",
      "botId": "fa017204-5ea9-4145-9c48-412bdfc60c28",
      "hostUrl": "https://cdn.botpress.cloud/webchat/v1",
      "messagingUrl": "https://messaging.botpress.cloud",
      "clientId": "fa017204-5ea9-4145-9c48-412bdfc60c28",
      "webhookId": "af81bfda-4e1b-43bd-ab88-52e6d969bc71",
      "lazySocket": true,
      "themeName": "prism",
      "frontendVersion": "v1",
      "useSessionStorage": true,
      "enableConversationDeletion": true,
      "showPoweredBy": true,
      "theme": "prism",
      "themeColor": "#2563eb"
  });
  }

  return (
    <>
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

      {/* Testimonials */}

      <h1 className={styles.testimonialHeader}>Testimonials</h1>
      <hr className={styles.hrElement}/>

      <Carousel 
      showThumbs={false} 
      autoPlay 
      responsive={responsive}
      ssr
      containerClass="container-with-dots"
      itemClass="image-item"
      >

        {testimonials.map((item) => (
          <div key={item.id} className={styles.testimonialCard}>
            <Image src={item.src} alt="Image" width={200} height={200} className={styles.myImage} />
            <p>{item.content}</p>
            <h2>{item.header}</h2>
            
          </div>
        ))}
      </Carousel>

      {/* Apply for adoption CTA */}
      <div className={styles.centerButtonContainer}>
        <button className={styles.applyNowBtn} onClick={() => onApplyClick()}>Apply Now</button>
      </div>

      {/* Give a child up for adoption CTA */}
      <div className={styles.giveUpChild}>
        <Link href={"/give-up"}> 
        <p>Want to give up a child for adoption?</p>
        </Link>
      </div>

    </div>

    <Script 
    src="https://cdn.botpress.cloud/webchat/v1/inject.js" 
    onLoad={() => {
      initBotpress(); // update the parameters everytime there's a change
    }}
    strategy='afterInteractive'
    />
    </>
  )
}
