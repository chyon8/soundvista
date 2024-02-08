
import { getServerSession } from 'next-auth';

import { NextResponse } from 'next/server';
import User from '@/models/User'; // Adjust the path accordingly


export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const session = await getServerSession();
  

    if (!session) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    const userEmail = session.user.email;
    const user = await User.findOne({ email: userEmail });

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}



