import mysql from "mysql2/promise";
import { query } from "../../../lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  console.log("in here GET")
    const userId = params.userId;
    console.log("user id" + userId);  // works till here - it prints out the id from the url

      const mapped = await query({
          query: `SELECT children.*
          FROM children
          INNER JOIN application ON children.age = application.child_age
            AND children.sex = application.sex
          WHERE (
              (application.g_disorder = "yes" AND children.genetic_disorder <> "None")
              OR (application.g_disorder = "no" AND children.genetic_disorder = "None")
          )
          AND application.p_id = ?`,
          values: [userId],
      });
      return NextResponse.json({ mapped: mapped });
}