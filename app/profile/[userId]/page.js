"use client"

// Dynamically routed page specific to the user

import React, { useEffect, useState } from "react";
import styles from "../../../styles/profile.module.css";

const ProfilePageForUser = ({ params }) => {    

  console.log(decodeURIComponent(params.userId + typeof params.userId));
  const userId = decodeURIComponent(params.userId);

  const [mapped, setMapped] = useState([]); // store mapped kids values
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  // get their profile stuff
  async function getDetails() {
    try {
      const postData = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/profile/${userId}`,
        postData
      );

      if (!res.ok) {
        throw new Error(`API request failed with status ${res.status}`);
      }

      const response = await res.json();

      setMapped(response.mapped); // Update state with the correct table name
      setIsLoading(false); // Set loading state to false
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false); // loading state is set to false in case of an error
    }
  }

  useEffect(() => {
    getDetails();
  }, [userId]);

  return (
    <div className={styles.userPageContainer}>
    <h1>Hello! 👋</h1>
    <h3>Profile for user {userId}</h3>
      {/* display parents profile info here */}
      
    <div className={styles.childCardContainer}>
      {isLoading ? (
        <p>Loading...</p>
      ) : mapped.length > 0 ? (
        mapped.map((item, index) => {
          const dateAdmitted = new Date(item.date_admitted); // 2011-04-03T18:30:00.000Z
          const formattedDate = dateAdmitted.toISOString().split('T')[0]; // 2011-04-03
          return (
            
            <div key={item.child_id} className={styles.childCard}>
              <h3>Your preferences match...</h3>
              <p><span>Name</span>: {item.c_name}</p>
              <p><span>Age</span>: {item.age}</p>
              <p><span>Date Admitted</span>: {formattedDate}</p>
              <p><span>Sex</span>: {item.sex}</p>
              <p><span>Status</span>: {item.adoption_status}</p>
              <p><span>genetic disorders</span>: {item.genetic_disorder}</p>
            </div>
          );
        })
      ) : (
        <p>No matches yet..</p>
      )}
      </div>
    </div>
  );
};

export default ProfilePageForUser;