// Import necessary modules and components
import React from 'react';
import styles from "../../styles/about.module.css";
import Header from '../header';

// Define the About functional component
const About = () => {
    return (
        <>
            {/* Include the Header component */}
            <Header />

            {/* Main content container */}
            <div className={styles.contentContainer}>
                {/* Section: Who we are */}
                <h2 className={styles.whoWeAreHeader}>Who we are</h2>
                <hr className={styles.hrElement}/>
                <p className={styles.whoWeAre}>
                    Kulaabhooshanam was founded with a simple yet powerful vision: to create families through the beautiful act of adoption. We are dedicated to ensuring that every child finds a safe and nurturing environment to call home.
                    There is an extremely tedious process of application and verification for Adoption in India. Our portal works to enable The Government 
                    of India to bridge this gap between the adoptive parents and their children while also providing a secure environment for unwanted babies.
                </p>

                {/* Section: Why we do this */}
                <h2 className={styles.statsheader}>Why we do this</h2>
                <hr className={styles.hrElement}/>
                <p className={styles.someStats}>
                    India has more than 30 million orphaned and abandoned children, of whom 
                    less than 370 thousand have made it to institutionalized care and only around 3500 
                    are adopted annually. 11 million have been abandoned in public places like trains,
                    toilets, garbage bins or in forests left to traffickers and to animals and large birds of prey despite the presence of a legal system in place. The Consensus of July 2022 names more than 30000 prospective parents who have been awaiting an adoption referral for a minimum of 2 years. 
                </p>

                {/* Section: Contact Us */}
                <h2>Contact Us</h2>
                <hr className={styles.hrElement}/>
                <p className={styles.endingText}>
                    Adoption in India is a legal affair 
                    authorized by the Central Adoption Resource Authority (CARA), Ministry of Women 
                    and Child Development, Government of India.
                </p>

                <p className={styles.endingText}>
                    If you are considering adoption or have any questions about our services, please feel free to reach out to us.
                </p>

                {/* Contact information */}
                <p className={styles.contactInfo}>
                    Ph No: <span className={styles.details}>+912348920091</span> 
                    Email: <span className={styles.details}>kulaabhooshanam@gmail.com</span> 
                </p>
            </div>
        </>
    );
}

// Export the About component
export default About;
