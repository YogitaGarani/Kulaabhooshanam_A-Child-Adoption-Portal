"use client"

// All necessary imports
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { testimonials } from './testimonials';
import Header from './header';
import Script from 'next/script';

// Define the Home functional component
export default function Home() {

  // Initialize all refs and hooks
  const router = useRouter();
  const [agency, setAgency] = useState('false');

  // useEffect hook to update agency from localstorage
  useEffect(() => {
    const storedAgency = localStorage.getItem('isagency');
    if (storedAgency !== agency) {
      setAgency(storedAgency);
      setStates();
    }
  }, []);

  // Function to handle authencticated states
  const setStates = () => {
    setAgency(localStorage.getItem('isagency'));
    const loginResponse = localStorage.getItem('loginresponse');
    console.log(loginResponse);

    if (loginResponse) {
      const response = JSON.parse(loginResponse);
      if (response.message === 'LOGIN VALID') {
      }
    } else {
      console.log('Please login');
    }
  };

  // Function to handle Application click
  const onApplyClick = () => {
    if (!JSON.parse(localStorage.getItem('authenticated'))) {
      router.push('/login');
    } else {
      console.log('apply button clicked');
      router.push('/application');
    }
  };

  // Testimonial essentials
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
  };

  // Function to handle Child click
  const onChildClick = () => {
    router.push('/agency');
  };

  // Function to handle child update click
  const onUpdateClick = () => {
    router.push('/agencyupdate');
  };

  // Chatbot configuration
  const initBotpress = () => {
    window.botpressWebChat.init({
      composerPlaceholder: 'Come say Hi!',
      botConversationDescription: 'The Kulaabhooshanam team is happy to help you',
      botId: 'fa017204-5ea9-4145-9c48-412bdfc60c28',
      hostUrl: 'https://cdn.botpress.cloud/webchat/v1',
      messagingUrl: 'https://messaging.botpress.cloud',
      clientId: 'fa017204-5ea9-4145-9c48-412bdfc60c28',
      webhookId: 'af81bfda-4e1b-43bd-ab88-52e6d969bc71',
      lazySocket: true,
      themeName: 'prism',
      frontendVersion: 'v1',
      useSessionStorage: true,
      enableConversationDeletion: true,
      showPoweredBy: true,
      theme: 'prism',
      themeColor: '#2563eb',
    });
  };

  // Render the component
  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.backgroundImage}>
        <h1 className={styles.insideText}>Welcome to Kulaabhooshanam!</h1>
      </div>
      <div className={styles.pText}>
        <hr className={styles.hrElement} />
      </div>

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
            <p>
              Many babies are left at public spaces, and our volunteers bring us babies found abandoned. Many of the infants who survive are very fragile and/or premature and require hospitalization and intensive care. <br />
              Our adoption process finds loving families for those unwanted and we’re with them every step of the way ensuring a safe and smooth transition to their new home.
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardContent}>
            <span className={styles.cardContentHeader}>How can you help?</span>
            <p>
              Help us to ensure no baby is left abandoned and unloved. Volunteer your time and skills to support our programs and events. Your involvement can help create positive experiences for children and families. Help us raise awareness about the importance of adoption. Share our stories, events, and resources with your friends and community.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <h1 className={styles.testimonialHeader}>Testimonials</h1>
      <hr className={styles.hrElement} />

      <Carousel showThumbs={false} autoPlay responsive={responsive} ssr containerClass="container-with-dots" itemClass="image-item">
        {testimonials.map((item) => (
          <div key={item.id} className={styles.testimonialCard}>
            <Image src={item.src} alt="Image" width={150} height={150} className={styles.myImage} />
            <p>{item.content}</p>
            <h2>{item.header}</h2>
          </div>
        ))}
      </Carousel>
      {/* Conditional rendering of buttons */}
      {agency === 'true' ? (
        <div className={styles.centerButtonContainer}>
          <button className={styles.applyNowBtn} onClick={() => onChildClick()}>
            Register a child with your agency
          </button>
          <button className={styles.applyNowBtn} onClick={() => onUpdateClick()}>
            Update a registered child's details
          </button>
        </div>
      ) : (
        <div>
          <div className={styles.centerButtonContainer}>
            <button className={styles.applyNowBtn} onClick={() => onApplyClick()}>
              Apply Now
            </button>
          </div>
          <div className={styles.giveUpChild}>
            <Link href={'/giveup'}>
              <p>Want to give up a child for adoption?</p>
            </Link>
          </div>
        </div>
      )}
      {/* Chatbot */}
      <Script
        src = "https://cdn.botpress.cloud/webchat/v1/inject.js"
        onLoad = {() => {
          initBotpress(); // update the parameters every time there's a change
        }}
        strategy = "afterInteractive"
      />
    </div>
  );
}

