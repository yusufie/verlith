import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/utils/mongodb';
import connectDB from "@/utils/connectDB";
import getNextSequenceValue from '@/models/increment';
import Headline from '@/models/headline';
import Entry from '@/models/entry';

export const dynamic = 'force-dynamic';
export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise; // to establish a connection
    const db = client.db();
    const headlines = await db.collection('headlines').find({}).toArray();
    return NextResponse.json({ headlines });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

export async function POST(request: NextRequest) {
  try {
    // the field names to match the request body
    const { title, content, user_id } = await request.json();
    await connectDB();

    // Get the next available number
    const entry_number = await getNextSequenceValue('entryNumber');

    // Create a new entry document with the content
    const newEntry = new Entry({
      entry_number,
      content,
      type: 'first',
      posted_by_user_id: user_id,

    });

    // Save the new entry document
    await newEntry.save();

    // Get the next available number
    const headline_number = await getNextSequenceValue('headlineNumber');

    // Create a new headline document with the retrieved number
    const newHeadline = new Headline({
      headline_number,
      title,
      first_entry_id: newEntry._id, // _id of the newly created entry
      created_by_user_id: user_id,

    });

    // Save the new headline document
    await newHeadline.save();

    newEntry.headline_id = newHeadline._id; // _id of the newly created headline
    await newEntry.save();

    return NextResponse.json({ message: 'Headline created successfully!' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}