import mysql from "mysql2/promise";
import { query } from "../../../lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const userId = params.userId;
  console.log("user id " + userId);

  try {
    // Get a connection from the pool
    const connection = await mysql.createPool({
      host: 'localhost',
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });

    const ans = await connection.execute(`SELECT sex, child_age, g_disorder, p_id FROM APPLICATION WHERE p_id = ?`, [userId]);
    const pid = ans[0][0].p_id;
    const age = ans[0][0].child_age;
    const sex = ans[0][0].sex;
    const gen = ans[0][0].g_disorder;
    var gend = gen;
    if (gen === 'no') {
      gend = 'None';
    }
    const a = await connection.execute('SELECT C_ID FROM PARENTS WHERE P_ID = ? AND APPLN_STATUS <> ?', [userId, 'adopted']);
    if (a[0][0].C_ID != null) {
      const query1 = `SELECT CHILDREN.c_name, CHILDREN.sex, CHILDREN.age, CHILDREN.adoption_status, CHILDREN.genetic_disorder, CHILDREN.date_admitted FROM CHILDREN INNER JOIN PARENTS ON CHILDREN.CHILD_id = PARENTS.C_ID WHERE PARENTS.P_ID = ?`;
      const mapping = await connection.execute(query1, [userId]);
      console.log(mapping[0][0]);
      console.log('hello')
      return NextResponse.json({success: true, message: 'Mapping Successful', mapped: mapping[0]})
    }
    else {
      const [results, fields] = await connection.execute('CALL MapChildToParent(?, ?, ?, ?)', [sex, age, gend, pid]);
      if (results[0][0].STATUS === 'Failure: Child not found') {
        connection.release;
        return NextResponse.json({message: 'Not Found'}, {status: 200});
      }
      else {
        const query1 = `SELECT CHILDREN.c_name, CHILDREN.sex, CHILDREN.age, CHILDREN.adoption_status, CHILDREN.genetic_disorder, CHILDREN.date_admitted FROM CHILDREN INNER JOIN PARENTS ON CHILDREN.CHILD_id = PARENTS.C_ID WHERE PARENTS.P_ID = ?`;
        const mapping = await connection.execute(query1, [userId]);
        const query3 = `SELECT APP_ID FROM APPLICATION WHERE P_ID = ?`
        const query2 = `UPDATE APPLICATION SET c_id = (SELECT C_ID FROM PARENTS WHERE P_ID = ?) WHERE APP_ID = ?`
  
        const app_id = await connection.execute(query3, [userId]);
        const appln_id = app_id[0][0].APP_ID;
        const appset = await connection.execute(query2, [userId, appln_id]);
        return NextResponse.json({success: true, message: 'Mapping Successful', mapped: mapping[0]})
      }
    }
  } catch (error) {
    console.error('Error executing stored procedure:', error.message);
    return NextResponse.json({ success: false, message: 'Error executing stored procedure.' });
  }
}
