import mysql from "mysql2/promise";
import { query } from "../../lib/db";
import bcrypt from 'bcrypt';
import { NextResponse } from "next/server";

async function checkIfUserExists(id) {
  try {
    console.log("user checking--");
    const user = await query({
      query: 'SELECT * FROM ADOPTIONAGENCY WHERE AGENCY_ID = ?',
      values: [id]
    });

    console.log("id checking after query");
    console.log("Rows: " + user[0].phno);

    if (user.length > 0) {
      return user;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error in check user function request:", error);
    return NextResponse.json(
      { message: "error", error: "check user function - Internal server error" },
      { status: 500 },
      {name: null}
    );
  }
}

export async function POST(request) {
  const req = await request.json();
  const aid = req.aid;
  const pswd = req.pswd;
  console.log(req);
  console.log(pswd);
  console.log("here1");

  if (aid === undefined || pswd === undefined) {
    console.log("here2");
    return NextResponse.json(
      { message: "error", error: "Invalid input data" },
      { status: 400 },
      {name: null}
    );
  }
  else {
    console.log("VALID")
  }

  try {
    const UserExists = await checkIfUserExists(aid);
    console.log("id exists bool: " + UserExists[0].phno);

    if (UserExists.length > 0) {
      console.log("POST REQ CHECKING FOR id if block");
      try {
        const result = UserExists[0].phno === pswd;
        console.log(UserExists[0].agency_name)
        if (result) {
          console.log(result);
          return NextResponse.json(
            { message: "LOGIN VALID",  name: UserExists[0].agency_id},
            { status: 200 },
          );
        } else {
          return NextResponse.json(
            { message: "error", error: "Invalid password", name: null },
            { status: 401 },
          );
        }
      } catch (err) {
        console.error(err);
        return NextResponse.json(
          { message: "error", error: "Internal server error", name: null },
          { status: 500 },
        );
      }
    } else {
      console.log("User Does Not Exist");
      return NextResponse.json(
        { message: "error", error: "User Does Not exist", name: null },
        { status: 404 },
      );
    }
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json(
      { message: "error", error: "Internal server error", name: null },
      { status: 500 },
    );
  }
}

export async function GET(request) {
  req = request.json()
  pid = req.pid;
  const name = await query({
      query: "SELECT p_name FROM parents where p_id = pid",
      values: [],
  });
  return NextResponse.json({ name: name });
}
