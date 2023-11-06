import mysql from "mysql2/promise";
import { query } from "../../lib/db";

import { NextResponse } from "next/server";

export async function GET(request) {

    const parents = await query({
        query: "SELECT * FROM parents WHERE p_id = ?",
        values: [],
    });
    return NextResponse.json({ parents: parents });
}