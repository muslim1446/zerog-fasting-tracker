import { NextResponse } from 'next/server';
import { checkAllFastingUsers } from '@/lib/fastingTracker';

export async function GET() {
  try {
    const result = await checkAllFastingUsers();
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in check-fasting-phases API:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}