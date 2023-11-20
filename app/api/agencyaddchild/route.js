import mysql from "mysql2/promise";
import { query } from "../../lib/db";
import { NextResponse } from "next/server";


async function checkIfIDExists(id) {
  //const connection = await pool.getConnection();
  try {
    console.log("id checking--");
    const IdStuff = await query({
      query: 'SELECT * FROM children WHERE child_id = ?',
      values: [id]
    });

    console.log("id checking qafter query");
    // console.log("Rows: " + IdStuff);
    console.log(IdStuff.length > 0 ? "In application" : "Not in application yet");

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
    const req = await request.json();
    console.log(req);
    const sex = req.sex;
    const doa = req.doa;
    const dob = req.dob;
    const name = req.c_name;
    const childAge = parseInt(req.age, 10);
    const geneticDisorder = req.genetic_disorder;
    const adoption_status = req.adoption_status;
    const agencyid = req.agencyid;
    const child_id = req.cid;
    console.log(adoption_status)
    const query = "INSERT INTO `children` (`c_name`, `dob`, `sex`, `date_admitted`, `adoption_status`, `genetic_disorder`, `agency_id`, `age`) VALUES(?, ?, ?, ?, ?, ?, ?, ?)";
    try {
      if (checkIfIDExists(child_id)) {
        console.log('Child already exists');
      }

        const connection = await mysql.createConnection({
          host: 'localhost',
          user: process.env.MYSQL_USER,
          password: process.env.MYSQL_PASSWORD,
          database: process.env.MYSQL_DATABASE,
          "keepAliveInitialDelay": 
          10000, "enableKeepAlive": true 
        });
    try {
      const ans = await connection.execute(query, [name, dob, sex, doa, adoption_status, geneticDisorder, agencyid, childAge]);

      console.log("User does not exist.");
      return NextResponse.json(
        { message: "success", name: agencyid},
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
      query: "SELECT a.c_name, a.age, a.sex, a.adoption_status, a.genetic_disorder FROM children as a join adoptionagency as b on a.agency_id = b.agency_id",
      values: [],
    });
    console.log(applicationStuff)
    return NextResponse.json({ application: applicationStuff });
  }