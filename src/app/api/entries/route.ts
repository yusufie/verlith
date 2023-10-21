import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/utils/mongodb';
import connectDB from '@/utils/connectDB';
import getNextSequenceValue from '@/models/increment';
import Entry from '@/models/entry';
import Headline from '@/models/headline';
import Users from '@/models/users';

export const dynamic = 'force-dynamic';
export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise; // to establish a connection
    const db = client.db();
    const entries = await db.collection('entries').find({}).toArray();
    return NextResponse.json({ entries });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { content, type, posted_by_user_id, headline_id, reply_to } = await request.json();
    await connectDB();

    // find the headline document by its id
    const headline = await Headline.findById(headline_id);

    // if the headline document does not exist, return an error
    if (!headline) {
      return NextResponse.json({ error: 'Headline does not exist!' });
    }

    // find the user document by its id
    const user = await Users.findById(posted_by_user_id);

    // if the user document does not exist, return an error
    if (!user) {
      return NextResponse.json({ error: 'User does not exist!' });
    }

    // Get the next available number
    const entry_number = await getNextSequenceValue('entryNumber');

    // Create a new entry document 
    const newEntry = await Entry.create({
      entry_number,
      content,
      type,
      posted_by_user_id,
      headline_id,
      reply_to,
    });

    console.log('entry created successfully');

    return NextResponse.json({ newEntry });

  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}