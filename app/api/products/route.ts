import { NextResponse } from "next/server";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function GET(request: Request) {
  const res = await axios.get(API_URL + '/products?limit=0&skip=0')
  
  return NextResponse.json(res.data)
}