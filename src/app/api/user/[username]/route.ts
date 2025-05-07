import { NextRequest, NextResponse } from 'next/server';

const BEARER_TOKEN = process.env.BEARER_TOKEN; // Replace this with your actual token

export async function GET(request: NextRequest,
  { params }: { params: Promise<{ username: string }> },) {
    const { username } = await params;

  if (!username) {
    return NextResponse.json(
      { error: 'Username is required' },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://api.twitter.com/2/users/by/username/${username}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );

    const data = await response.json();
  const transformed = { ...data};
 
  return new Response(JSON.stringify(transformed), {
    headers: { 'Content-Type': 'application/json' },
  });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch data from Twitter API.' },
      { status: 500 }
    );
  }
}
