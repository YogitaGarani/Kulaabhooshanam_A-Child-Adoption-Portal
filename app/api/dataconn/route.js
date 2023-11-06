import mysql from "mysql2/promise";
import { query } from "../../lib/db";

import { NextResponse } from "next/server";

export async function GET(request) {

    const agencies = await query({
        query: "SELECT * FROM adoptionagency",
        values: [],
    });
    return NextResponse.json({ adoptionagency: agencies });
}

// export async function GET(request) {
//     try {
//         // Create the connection to the database
//         const connection = await mysql.createConnection({
//             host: 'localhost',
//             user: process.env.MYSQL_USER,
//             password: process.env.MYSQL_PASSWORD,
//             database: process.env.MYSQL_DATABASE,
//         });

//         // Now you can use the connection for database operations
//         // For example, you can execute queries here
//         // query database
//         const [rows, fields] = await connection.execute('SELECT * FROM adoption_agency');

//         // Don't forget to close the connection when you're done
//         await connection.end();

//         // return new Response("Connected to the database successfully", {
//         //     status: 200
//         // });
//         return new Response(JSON.stringify(rows), {
//             status: 200,
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });
//     } catch (error) {
//         console.error("Error connecting to the database:", error);
//         return new Response("Error connecting to the database", {
//             status: 500
//         });
//     }
// }


// export async function GET(request) {
//     console.log("hi")
//     // create the connection to database
//     const connection = mysql.createConnection({
//         host: 'localhost',
//         user: 'root',
//         database: 'adoption'
//     });
  
  // simple query
//   connection.query(
//     'SELECT * FROM `table` WHERE `name` = "Page" AND `age` > 45',
//     function(err, results, fields) {
//       console.log(results); // results contains rows returned by server
//       console.log(fields); // fields contains extra meta data about results, if available
//     }
//   );
  
  // with placeholder
//   connection.query(
//     'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
//     ['Page', 45],
//     function(err, results) {
//       console.log(results);
//     }
//   );
//     return NextResponse.json({ name: "john" });
// }
