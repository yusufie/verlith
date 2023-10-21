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
    const entries = await db.collection('entries').findOne({ _id: id as any });

    if (!entries) {
      return NextResponse.error();
    }
    
    return NextResponse.json({ entries });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

// Export the POST method
 
export async function POST(request: NextRequest) {
  try {
    const parts = request.url.split('/');
    const id = parts[parts.length - 1];

    if (!id) {
      return NextResponse.error();
    }

    const client = await clientPromise; // to establish a connection
    const db = client.db();

    // Find the specific entry based on the id
    const entry = await db.collection('entries').findOne({ _id: id as any });

    if (!entry) {
      return NextResponse.error();
    }

    // Extract the user_id from the request body
    const { user_id } = await request.json();

    // Check if the user has already liked the entry
    const userLikedEntry = entry.likes.some((like:any) => like.user_id === user_id);

    // Update the entry based on whether the user has already liked it
    let updatedEntry;
    if (userLikedEntry) {
      updatedEntry = await db.collection('entries').updateOne(
        { _id: id as any },
        {
          $pull: {
            likes: { user_id: user_id as any }, // remove the user_id from the likes array
          },
        }
      );
      console.log('unliked');
    } else {
      updatedEntry = await db.collection('entries').updateOne(
        { _id: id as any },
        {
          $push: {
            likes: {
              // add the user_id to the likes array as an ObjectId
              user_id: user_id as any,
            },
          },
        }
      );
      console.log('liked');
    }

    if (!updatedEntry) {
      return NextResponse.error();
    }

    return NextResponse.json({ message: 'Entry liked/unliked successfully!' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
