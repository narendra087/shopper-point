import { NextResponse } from "next/server";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  
  const res = await axios.get(API_URL + `/carts${id ? '/'+id : '?limit=0&skip=0' }`)
  
  return NextResponse.json(res.data)
}