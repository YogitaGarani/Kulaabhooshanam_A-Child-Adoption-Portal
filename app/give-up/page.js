"use client"

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { NextResponse } from "next/server";
import Image from 'next/image';
import formImage from "../../public/formImages.jpg"
import styles from "../../styles/forms.module.css";

const GiveUp = () => {
 // const router = useRouter();
  //const parentIDToAddRef = useRef();
  const nameOfChildToAddRef = useRef();
  const sexOfChildToAddRef = useRef();
  const ageOfChildToAddRef = useRef();
  const genDisorderToAddRef = useRef();

  const [created, setCreated] = useState(false);
  const [error, setError] = useState(false);

  
    // testing for get part
    //const router = useRouter();
    const [applicationStuff, setApplicationStuff] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Add loading state
  
    async function getApplications() {
      try {
        const postData = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/give-up`,
          postData
        );
  
        console.log("URL BEING USED:" + process.env.NEXT_PUBLIC_URL)
        if (!res.ok) {
          throw new Error(`API request failed with status ${res.status}`);
        }
  
        const response = await res.json();
        console.log("API Response:", response);
        setApplicationStuff(response.application); // Update state with the correct table name
        setIsLoading(false); // Set loading state to false
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false); // loading state is set to false in case of an error
      }
    }
  
    useEffect(() => {
      getApplications();
    }, []);


    // post part
    async function addData () {
      try {
        console.log("add data clicked")
        const sex = sexOfChildToAddRef.current.value.trim();
        const childAge = ageOfChildToAddRef.current.value.trim();
        // const parentID = parentIDToAddRef.current.value.trim();
        const childName = nameOfChildToAddRef.current.value.trim();
        const geneticDisorder = genDisorderToAddRef.current.value.trim();

        console.log("pagejs gen: " + geneticDisorder)
        const postData = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sex: sex,
            age: parseInt(childAge, 10),
            // p_id: parentID, 
            c_name: childName,
            genetic_disorder: geneticDisorder,
          }),
        };
        console.log("here p1");
        // if (parentID.length !== 14) {
        //   console.log("length MUST BE 14")
        //   return;
        // }
        // console.log("parentID.lengthhh" + parentID.length);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/give-up`,
          postData
        );

          console.log("here p2")
        console.log("POST -- URL BEING USED:" + process.env.NEXT_PUBLIC_URL)
        if (!res.ok) {
          setError(true);
          console.log("in res not ok!");
          throw new Error(`API request failed with status ${res.status}`);
        }

        // console.log("resss: " + res.json())
        const response = await res.json();
        console.log("POST --- API Response:", response);
        if (response.message !== "success") {
          console.error("API Error:", response.message);
          return;
        }
        if (response.message === "success") {
          setCreated(true);
          // router.push({
          //   pathname: '/profile',
          //   query: {
          //     sex: sexOfChildToAddRef.current.value.trim(),
          //     child_age: ageOfChildToAddRef.current.value.trim(),
          //     p_id: parentIDToAddRef.current.value.trim(),
          //   },
          // });
        }
      } catch (error) {
        console.error("POST -- Error fetching data:", error);
        //return res.json({ response: { message: "error", error: error.message } }, 500);
      }
      
    }

    // const onProfileClick = () => {
    //   console.log("profile button clicked")
    //   router.push("/profile") // OR /about/id OR /profile/[id]???
    // }
    
  return (
    <>
    
    <main className={styles.mainBox}>
        <form className= {styles.formElement} onSubmit={addData} method='POST'>
            <div className={styles.formContainer}>
                <div className={styles.headingContainer}>
                  <h1 className={styles.h1}>Give up a child for Adoption</h1>
                  <p className={styles.pTag}>Building relationships, one family at a time.</p>
                </div>

                <div className={styles.inputsContainer}>
                    {/* Name of the child input */}
                    <div className={styles.inputDivs}>
                        <label htmlFor="c_name">Name of the child</label>
                        <p></p>
                        <input 
                        className={styles.inputBox}
                        type="text"
                        // name="Sex"
                        ref={nameOfChildToAddRef}
                        required
                        />
                    </div>
                    {/* Sex of the child input */}
                    <div className={styles.inputDivs}>
                        <label htmlFor="sex">Sex of the child</label>
                        <p></p>
                        <input 
                        className={styles.inputBox}
                        type="text"
                        // name="Sex"
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
                        // name="child_age"
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
                        // name="Sex"
                        ref={genDisorderToAddRef}
                        placeholder="None / fill it up" 
                        required
                        />
                    </div>
                </div>
            {/* </div> */}
            {/* make btn input ig? */}
            {/* {created ? <div>Success!</div> : null} */}
            {/* <button type="submit">Submit Application</button>  */}
            {/* <div> */}
            <div className={styles.saveButton}>
              <input
                  value="Save"
                  type="button"
                  onClick={addData}
                />
            </div>
            {created && <div className={styles.successMsg}>Success!</div>}
            {error && <div className={styles.errorMsg}>Error: Login or Use a different ID</div>}
            </div>
            <div className={styles.formImage}>
              <Image src={formImage} alt='Family Form Image'/>
            </div>
        </form>

        {/* <div className={styles.profileBtn}>
          <button onClick={() => onProfileClick()}>Proceed to profile</button>
        </div> */}
      </main>
        


        {/* Display the fetched data */}
      <div>
      <h2>Read Applications</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : applicationStuff.length > 0 ? (
        applicationStuff.map((item, index) => {
          return (
            <div key={item.app_id}>
              <span>agency_id</span>: {item.app_id} <br />
              <span>p ID</span>: {item.p_id}
            </div>
          );
        })
      ) : (
        <p>No applns to display.</p>
      )}
      </div>
    </>
  );
};

export default GiveUp;
