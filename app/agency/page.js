//Client side rendering
'use client'
// Import necessary modules and components
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import formImage from "../../public/formImages.jpg"
import styles from "../../styles/forms.module.css";
import Collage from './collage';
import Header from '../header';

// Define the Agency functional component
const Agency = () => {
  // Initialize necessary hooks and refs
  const router = useRouter();
  const nameOfChildToAddRef = useRef();
  const sexOfChildToAddRef = useRef();
  const ageOfChildToAddRef = useRef();
  const genDisorderToAddRef = useRef();
  const CIDAddtoRef = useRef();
  const DOAAddToRef = useRef();
  const DOBAddToRef = useRef();
  const [agencyid, setAgencyID] = useState();
  const [created, setCreated] = useState(false);
  const [error, setError] = useState(false);

  // Effect hook to set the agency ID from localStorage
  useEffect(() => {
    setAgencyID(localStorage.getItem('agencyid'))
  });

  // Function to handle the addition of data
  async function addData() {
    try {
      // Extract data from input refs
      const sex = sexOfChildToAddRef.current.value.trim();
      const childAge = ageOfChildToAddRef.current.value.trim();
      const childName = nameOfChildToAddRef.current.value.trim();
      const geneticDisorder = genDisorderToAddRef.current.value.trim();
      const dob = DOBAddToRef.current.value.trim();
      const doa = DOAAddToRef.current.value.trim();
      const cid = CIDAddtoRef.current.value.trim();

      // Format dates
      const DateofBirth = new Date(dob);
      const birth = DateofBirth.toISOString().split('T')[0];
      const dateObject = new Date(doa);
      const admitted = `${dateObject.getFullYear()}-${(dateObject.getMonth() + 1).toString().padStart(2, '0')}-${dateObject.getDate().toString().padStart(2, '0')} ${dateObject.getHours().toString().padStart(2, '0')}:${dateObject.getMinutes().toString().padStart(2, '0')}:${dateObject.getSeconds().toString().padStart(2, '0')}`;

      // Prepare data for POST request
      const ads = 'inhouse';
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
          dob: birth,
          doa: admitted,
          adoption_status: ads,
          agencyid: agencyid,
          cid: cid,
        }),
      };

      // Make API request to add child data
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/agencyaddchild`,
        postData
      );

      // Handle response
      if (!res.ok) {
        setError(true);
        throw new Error(`API request failed with status ${res.status}`);
      }

      const response = await res.json();
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
        {/* Form for adding child data */}
        <form className={styles.formElement} onSubmit={addData} method='POST'>
          <div className={styles.formContainer}>
            {/* Heading and description */}
            <div className={styles.headingContainer}>
              <h1 className={styles.h1}>Kulaabhooshanam</h1>
              <p className={styles.pTag}>Building relationships, one family at a time.</p>
            </div>

            {/* Input fields for child data */}
            <div className={styles.inputsContainer}>
              <div>
                <div className = {styles.inputDivs}>
                  <label htmlFor = "c_id">Registered ID of the child</label>
                  <p></p>
                  <input
                    className = {styles.inputBox}
                    type = "number"
                    ref = {CIDAddtoRef}
                    required
                    placehelder = 'ID'
                  />
                </div>
                {/* Name of the child input */}
                <div className = {styles.inputDivs}>
                  <label htmlFor = "c_name">Name of the child</label>
                  <p></p>
                  <input 
                    className = {styles.inputBox}
                    type = "text"
                    ref = {nameOfChildToAddRef}
                    required
                    placheholder = 'Name'
                  />
                </div>
                  {/* Sex of the child input */}
                  <div className = {styles.inputDivs}>
                    <label htmlFor = "sex">Sex of the child</label>
                    <p></p>
                    <input 
                      className = {styles.inputBox}
                      type = "text"
                      ref = {sexOfChildToAddRef}
                      placeholder = "male / female / other" 
                      required
                    />
                  </div>
                  {/* Age of child input */}
                  <div className = {styles.inputDivs}>
                    <label htmlFor = "age">Age of the child</label>
                    <p></p>
                    <input
                      className = {styles.inputBox}
                      type="number"
                      // name="child_age"
                      ref = {ageOfChildToAddRef}
                      placeholder = "Age of the child"
                      required
                    />
                  </div>
                  <div className = {styles.inputDivs}>
                    <label htmlFor = "c_dob">Date of birth</label>
                    <p></p>
                    <input 
                      className = {styles.inputBox}
                      type = "text"
                      // name="Sex"
                      ref = {DOBAddToRef}
                      required
                      placeholder = 'yyyy-mm-dd'
                    />
                  </div>
                  <div className = {styles.inputDivs}>
                  <label htmlFor = "c_doa">Date of addmittance</label>
                  <p></p>
                  <input 
                    className = {styles.inputBox}
                    type = "datetime"
                    ref = {DOAAddToRef}
                    required
                    placeholder = 'yyyy-mm-dd hh:mm:ss'
                  />
                </div>
                <div className = {styles.inputDivs}>
                  {/* Gen disorder input */}
                  <p className = {styles.radioLabel}
                    htmlFor = "genetic_disorder">Genetic Disorders (If yes, please specify.)</p>
                    <p></p>
                    <input 
                      className = {styles.inputBox}
                      type="text"
                      ref = {genDisorderToAddRef}
                      placeholder = "None / Specifics" 
                      required
                    />
                  </div>
                {/* Save button */}
                <div className={styles.saveButton}>
                  <input
                    value = "Save"
                    type = "button"
                    onClick = {addData}
                  />
                </div>
              </div>
              {/* Display success and error messages */}
              {created && <div className = {styles.successMsg}>Success!</div>}
              {error && <div className = {styles.errorMsg}>Error: Could not enter child details, please recheck the values</div>}
            </div>
          </div>
          <Collage />
        </form>
      </main>
    </>
  );
};

// Export the Agency component
export default Agency;
