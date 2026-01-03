import { NextRequest, NextResponse } from 'next/server';

// Hard-coded credentials for now (admin/12345)
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = '12345';
const SECRET_TOKEN = 'artemis-admin-token-2026';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // Validate credentials
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      return NextResponse.json({
        token: SECRET_TOKEN,
        session: {
          username,
          role: 'admin',
          loginTime: new Date().toISOString(),
        },
      });
    }

    return NextResponse.json(
      { error: 'Invalid username or password' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
