"use client"

// All necessary inputs
import React, { useState, useRef} from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import formImage12 from "../../public/formImages12.jpg"
import styles from "../../styles/forms.module.css";
import Header from '../header';

// Define the GiveUp functional component
const GiveUp = () => {

  // Initialize necessary hooks and refs
  const router = useRouter();
  const nameOfChildToAddRef = useRef();
  const sexOfChildToAddRef = useRef();
  const ageOfChildToAddRef = useRef();
  const genDisorderToAddRef = useRef();

  const [created, setCreated] = useState(false);
  const [error, setError] = useState(false);


  // Function to handle the addition of data
  async function addData () {
    try {
      const sex = sexOfChildToAddRef.current.value.trim();
      const childAge = ageOfChildToAddRef.current.value.trim();
      const childName = nameOfChildToAddRef.current.value.trim();
      const geneticDisorder = genDisorderToAddRef.current.value.trim();

      // Prepare data for POST request
      const postData = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sex: sex,
          age: parseInt(childAge, 10),
          c_name: childName,
          genetic_disorder: geneticDisorder,
        }),
      };

      // Make API request to give up child
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/giveup`,
        postData
      );

    // Handle response
      if (!res.ok) {
        setError(true);
        console.log("in res not ok!");
        throw new Error(`API request failed with status ${res.status}`);
      }

      const response = await res.json();
      console.log("POST --- API Response:", response);
      if (response.message !== "success") {
        console.error("API Error:", response.message);
        return;
      }
      if (response.message === "success") {
        setCreated(true);
        router.push('/');
      }
    } catch (error) {
      console.error("POST -- Error fetching data:", error);
    }
  }

  // Render the component
  return (
    <>
    <Header />
    <main className={styles.mainBox}>
        <form className= {styles.formElement} onSubmit={addData} method='POST'>
            <div className={styles.formContainer}>
                <div className={styles.headingContainer}>
                  <h1 className={styles.h1}>Give up a child for Adoption</h1>
                </div>

                <div className={styles.inputsContainer}>
                  <div>
                    {/* Name of the child input */}
                    <div className={styles.inputDivs}>
                        <label htmlFor="c_name">Name of the child</label>
                        <p></p>
                        <input 
                        className={styles.inputBox}
                        type="text"
                        ref={nameOfChildToAddRef}
                        required
                        placeholder = 'Name'
                        />
                    </div>
                    {/* Sex of the child input */}
                    <div className={styles.inputDivs}>
                        <label htmlFor="sex">Sex of the child</label>
                        <p></p>
                        <input 
                        className={styles.inputBox}
                        type="text"
                        ref={sexOfChildToAddRef}
                        placeholder="male / female" 
                        required
                        />
                    </div>
                    {/* Age of child input */}
                    <div className={styles.inputDivs}>
                        <label htmlFor="age">Age of the child</label>
                        <p></p>
                        <input
                        className={styles.inputBox}
                        type="number"
                        ref={ageOfChildToAddRef}
                        placeholder="Age of the child"
                        required
                        />
                    </div>
                    {/* Gen disorder input */}
                    <p className={styles.radioLabel}htmlFor="genetic_disorder">Genetic Disorders (If yes, please specify.)</p>
                    <div className={styles.inputDivs}>
                        <p></p>
                        <input 
                        className={styles.inputBox}
                        type="text"
                        ref={genDisorderToAddRef}
                        placeholder="None / fill it up" 
                        required
                        />
                    </div>
            <div className={styles.saveButton}>
              <input
                  value="Save"
                  type="button"
                  onClick={addData}
                />
            </div>
            </div>
            {/* Display success and error message */}
            {created && <div className={styles.successMsg}>Success!</div>}
            {error && <div className={styles.errorMsg}>Error: Could not read the data. Please try again.</div>}
            </div>
            </div>
            <div className = {styles.formImage}>
            <Image src = {formImage12} alt = "Family Form Image" />
            </div>
        </form>
      </main> 
    </>
  );
};

export default GiveUp;