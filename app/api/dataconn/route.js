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
