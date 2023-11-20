import mysql from "mysql2/promise";
import { query } from "../../lib/db";

import { NextResponse } from "next/server";

async function checkIfNotRegistered(id) {
  try {
    console.log("parent table id checking--");
    const IdStuff = await query({
      query: 'SELECT * FROM parents WHERE p_id = ?',
      values: [id]
    });

    console.log("parent id checking qafter query");
    console.log(IdStuff.length === 0 ? "not in parents" : "in parents")

    return IdStuff;
  } catch (error) {
    console.error("Error in check ID function request:", error);
    return NextResponse.json(
      { message: "error", error: "check ID function -Internal server error" },
      { status: 500 }
    );
  }
}

async function checkIfIDExists(id) {
  try {
    console.log("id checking--");
    const IdStuff = await query({
      query: 'SELECT * FROM application WHERE p_id = ?',
      values: [id]
    });

    console.log("id checking qafter query");
    console.log(IdStuff.length > 0 ? "In application" : "Not in application yet");

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
    console.log(data);
    let message;
    const sex = data.sex;
    const childAge = data.child_age;
    const parentID = data.p_id;
    const geneticDisorder = data.g_disorder;
    
    // Check for undefined values
    console.log("here1")
    // console.log(sex + " " + childAge + " " + parentID + " " + geneticDisorder); // -- works
    if (
      sex === undefined ||
      childAge === undefined ||
      parentID === undefined ||
      geneticDisorder === undefined
    ) {
        console.log("here2")
      return NextResponse.json(
        { message: "error", error: "Invalid input data" },
        { status: 400 }
      ); // Bad Request
    }
    
    try {
      const notRegistered = await checkIfNotRegistered(parentID).length;
      const idExists = await checkIfIDExists(parentID);
      console.log("parent id does not exist: " + notRegistered);
      console.log("id exists bools: " + idExists);
      console.log()
      if (notRegistered) {
        console.log("POST REQ CHECKING FOR id if block --- not registered only");
        return NextResponse.json(
          { message: "error", error: "ID does not exists." },
          { status: 400 }
        ); // Bad Request
      }

      if (idExists) {
        console.log("POST REQ CHECKING FOR id if block --- already applied! ");
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
    return NextResponse.json({ application: applicationStuff });
  }