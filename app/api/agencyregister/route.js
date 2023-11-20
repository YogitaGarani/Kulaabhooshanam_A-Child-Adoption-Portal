import mysql from "mysql2/promise";
import { query } from "../../lib/db";
import { NextResponse } from "next/server";

async function checkIfUserExists(id) {
    try {
      console.log("user checking--");
      const user = await query({
        query: 'SELECT * FROM ADOPTIONAGENCY WHERE AGENCY_ID = ?',
        values: [id]
      });
    
      console.log("id checking qafter query");
      console.log("Rows: " + user);
      console.log(user.length)

      return user.length > 0;
    } catch (error) {
      console.error("Error in check user function request:", error);
      return NextResponse.json(
        { message: "error", error: "check user function -Internal server error" },
        { status: 500 }
      );
    }
}
  


export async function POST(request) {
    const req = await request.json();
    const aid = req.aid;
    const name = req.name;
    const mail = req.mail;
    const ph = req.ph;
    const loc = req.loc;
    const addr = req.addr;
    const nsa = req.nsa;
    const aks = req.aks;

const query1 = 'INSERT INTO ADOPTIONAGENCY (`agency_name`, `location`, `address`, `phno`, `email_id`, `numkids`, `num_succ_ad`) VALUES (?, ?, ?, ?, ?, ?, ?)'
try {
  const result = await checkIfUserExists(aid);

  if (result) {
      console.log(result)
      console.log("POST REQ CHECKING FOR user if block");
      return NextResponse.json(
          { message: "exists" },
          { status: 201 }
      );
  } else {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      "keepAliveInitialDelay": 
      10000, "enableKeepAlive": true 
    });


    try {
      const ans = await connection.execute(query1, [name, loc, addr, ph, mail, aks, nsa]);

      console.log("User does not exist.");
      return NextResponse.json(
        { message: "LOGIN VALID", name: name},
        { status: 200 }
      );
    } catch (error) {
      console.error("Error executing query:", error);
      return NextResponse.json(
        { message: "error", error: "Error executing query" },
        { status: 500 }
      );
    } finally {
      await connection.end(); // Close the connection after executing the query
    }
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
    const parent = await query({
      query: "SELECT * FROM PARENTS",
      values: [],
    });
    return NextResponse.json({ application: parent });
  }