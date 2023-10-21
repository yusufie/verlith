import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/utils/mongodb';
import { ObjectId } from 'mongodb'; // Import the ObjectId constructor

export const dynamic = 'force-dynamic';
export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise; // to establish a connection
    const db = client.db();
    const users = await db.collection('users').find({}).toArray();
    return NextResponse.json({ users });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { _id, username, tier, role } = await request.json();

    // Check if the _id exists
    if (!_id) {
      return NextResponse.json({ error: 'User ID is required.' });
    }

    const client = await clientPromise; // to establish a connection
    const db = client.db();

    // Convert _id to ObjectId
    const userId = new ObjectId(_id);

    // Find the user by _id and update their information
    const result = await db.collection('users').updateOne(
      { _id: userId }, // Filter by _id
      {
        $set: {
          username,
          tier,
          role,
        },
      }
    );
    
    // Check if the update was successful
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'User not found.' });
    }
    
    return NextResponse.json({ message: 'User updated successfully!' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}