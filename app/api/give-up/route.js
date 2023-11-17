import mysql from "mysql2/promise";
import { query } from "../../lib/db";

import { NextResponse } from "next/server";

export async function POST(request) {
    const data = await request.json();
    console.log(data);  // json of the data sent by the form
    let message;
    const sex = data.sex;
    const childAge = data.age;
    const childName = data.c_name;
    const geneticDisorder = data.genetic_disorder;
    const adoptionStatus = "inhouse"; // default inhouse
    
    // Check for undefined values
    if (
      sex === undefined ||
      childAge === undefined ||
      childName === undefined ||
      geneticDisorder === undefined
    ) {

      return NextResponse.json(
        { message: "error", error: "Invalid input data" },
        { status: 400 }
      ); // Bad Request
    }
    
    try {

      const addChildData = await query({
        query:
          `INSERT INTO children(c_name, sex, age, genetic_disorder, adoption_status) VALUES(?, ?, ?, ?, ?)`,
        values: [childName, sex, childAge, geneticDisorder, adoptionStatus],
      });
  
      // if insertion was a success, it generates an id
      // set table names to the corresponding variables used here
      if (addChildData.insertId) {
        message = "success";
        let ChildData = {
          child_id: addChildData.insertId,
          sex: sex,
          age: childAge,
          c_name: childName,
          genetic_disorder: geneticDisorder,
          adoption_status: "inhouse",
        };
  
        return NextResponse.json({
          message: message,
          ChildData: ChildData,
        });
      } else {
        // Handle the case where the insert operation did not generate an ID.
        throw new Error("Insert operation failed.");
      }
    } catch (error) {
      console.error("Error in POST request:", error);
      return NextResponse.json(
        { message: "error", error: "Internal server error" },
        { status: 500 }
      );
    }
  }
  
  export async function GET(request) {
    const applicationStuff = await query({
      query: "SELECT * FROM application",
      values: [],
    });
    // send response back to client side
    return NextResponse.json({ application: applicationStuff });
  }