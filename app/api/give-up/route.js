import mysql from "mysql2/promise";
import { query } from "../../lib/db";

import { NextResponse } from "next/server";

export async function POST(request) {
    const data = await request.json();
    console.log(data);
    let message;
    const sex = data.sex;
    const childAge = data.age;
    const childName = data.c_name;
    const geneticDisorder = data.genetic_disorder;
    
    // Check for undefined values
    console.log("here1")
    console.log(sex + " " + childAge + " " + childName + " " + geneticDisorder); // -- works
    if (
      sex === undefined ||
      childAge === undefined ||
      childName === undefined ||
      geneticDisorder === undefined
    ) {
        console.log("here2")
      return NextResponse.json(
        { message: "error", error: "Invalid input data" },
        { status: 400 }
      ); // Bad Request
    }
    
    try {
      console.log("in try block of POST req")

      const addChildData = await query({
        query:
          `INSERT INTO children(c_name, sex, age, genetic_disorder) VALUES(?, ?, ?, ?)`,
        values: [childName, sex, childAge, geneticDisorder],
      });
  
      // if insertion was a success, it generates an id
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
    return NextResponse.json({ application: applicationStuff });
  }