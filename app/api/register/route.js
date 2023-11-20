import mysql from "mysql2/promise";
import { query } from "../../lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

async function checkIfUserExists(id) {
    try {
      console.log("user checking--");
      const user = await query({
        query: 'SELECT * FROM PARENTS WHERE p_id = ?',
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
    const pid = req.pid;
    const name = req.name;
    const age = parseInt(req.age, 10);
    const maritalstatus = req.mar;
    const spousename = req.spn;
    const spouseage = parseInt(req.spage, 10);
    const emailid = req.mail;
    const ph = req.ph;
    const nbiokids = parseInt(req.nbio, 10);
    const nadoptedkids = parseInt(req.nad, 10);
    const income = parseInt(req.inc, 10);
    const bankdetails = req.bank;
    const sex = req.sex;
    const pswd = req.pswd;
    const fin = req.fin;
    const caste = req.caste;
    const spaad = req.spaad;
    const address = req.addr;
    console.log(fin)

const query1 = 'INSERT INTO PARENTS (`p_id`, `p_name`, `email_id`, `pswd`, `n_bio_kids`, `n_adopted_kids`, `appln_status`, `phno`, `sex`, `annual_income`, `bank_details`, `marital_status`, `age`, `spouse_age`, `spouse_name`, `address`, `financial_status`, `caste`, `spouse_aadhar`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
try {
  const result = await checkIfUserExists(pid);

  if (result) {
      console.log(result)
      console.log("POST REQ CHECKING FOR user if block");
      return NextResponse.json(
          { message: "exists" },
          { status: 200 }
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
      const hashedPswd = bcrypt.hashSync(pswd, 8);
      console.log(hashedPswd);
      const ans = await connection.execute(query1, [pid, name, emailid, hashedPswd, nbiokids, nadoptedkids, 'null', ph, sex, income, bankdetails, maritalstatus, age, spouseage !== 0 ? spouseage : 0, spousename !== 'null' ? spousename : null, address, fin, caste !== 'null' ? caste : null, spaad !== 'null' ? spaad : null]);

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