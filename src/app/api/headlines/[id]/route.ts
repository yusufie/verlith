import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/utils/mongodb';

export const dynamic = 'force-dynamic';
export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise; // to establish a connection
    const db = client.db();
    
    // Extract the 'id' from the request URL path
    const parts = request.url.split('/');
    const id = parts[parts.length - 1];

    // Ensure id is not empty
    if (!id) {
      return NextResponse.error();
    }

    // Fetch the specific headline based on the id
    const headlines = await db.collection('headlines').findOne({ _id: id as any });

    if (!headlines) {
      return NextResponse.error();
    }
    
    return NextResponse.json({ headlines });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
