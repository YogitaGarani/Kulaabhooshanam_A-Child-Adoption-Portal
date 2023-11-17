import mysql from "mysql2/promise";
import { query } from "../../lib/db";

import { NextResponse } from "next/server";

// check if ID isnt even in the parents table, so not registered
async function checkIfNotRegistered(id) {
  try {
    const IdStuff = await query({
      query: 'SELECT * FROM parents WHERE p_id = ?',
      values: [id]
    });

    // If rows is empty, the ID does not exist
    return IdStuff.length === 0;
  } catch (error) {
    console.error("Error in check ID function request:", error);
    return NextResponse.json(
      { message: "error", error: "check ID function -Internal server error" },
      { status: 500 }
    );
  }
}

// check if an ID exists in the application table
async function checkIfIDExists(id) {
  try {
    const IdStuff = await query({
      query: 'SELECT * FROM application WHERE p_id = ?',
      values: [id]
    });

    // If rows is not empty, the ID already exists
    return IdStuff.length > 0;
  } catch (error) {
    console.error("Error in check ID function request:", error);
    return NextResponse.json(
      { message: "error", error: "check ID function -Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
    const data = await request.json();
    console.log(data);  // json of the data sent by the form inputs
    let message;
    const sex = data.sex;
    const childAge = data.child_age;
    const parentID = data.p_id;
    const geneticDisorder = data.g_disorder;
     
    if (
      sex === undefined ||
      childAge === undefined ||
      parentID === undefined ||
      geneticDisorder === undefined
    ) {

      return NextResponse.json(
        { message: "error", error: "Invalid input data" },
        { status: 400 }
      ); // Bad Request
    }
    
    try {
      const notRegistered = await checkIfNotRegistered(parentID);
      const idExists = await checkIfIDExists(parentID);

      // User has not registered
      if (notRegistered) {
        return NextResponse.json(
          { message: "error", error: "ID does not exists." },
          { status: 400 }
        ); // Bad Request
      }

      // User has already applied
      if (idExists) {
        return NextResponse.json(
          { message: "error", error: "ID already exists." },
          { status: 400 }
        ); // Bad Request
      }

      const addApplicationData = await query({
        query:
          "INSERT INTO application(p_id, sex, child_age, g_disorder) VALUES(?, ?, ?, ?)",
        values: [parentID, sex, childAge, geneticDisorder],
      });
  
      // if insertion was a success, it generates an id
      // set table names to the corresponding variables used here
      if (addApplicationData.insertId) {
        message = "success";
        let applicationData = {
          app_id: addApplicationData.insertId,
          sex: sex,
          child_age: childAge,
          p_id: parentID,
          g_disorder: geneticDisorder,
        };
  
        return NextResponse.json({
          message: message,
          applicationData: applicationData,
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

    // send response back to the client side
    return NextResponse.json({ application: applicationStuff });
  }