import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/academy/[slug] - Get academy branding and config
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const academy = await prisma.academy.findUnique({
      where: { slug },
      select: {
        id: true,
        name: true,
        slug: true,
        email: true,
        phone: true,
        primaryColor: true,
        secondaryColor: true,
        textColor: true,
        logoUrl: true,
        bannerUrl: true,
        address: true,
        city: true,
        state: true,
        website: true,
      }
    });

    if (!academy) {
      return NextResponse.json(
        { error: 'Academy not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(academy);
  } catch (error) {
    console.error('Error fetching academy:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/academy/[slug] - Update academy branding
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();

    const academy = await prisma.academy.update({
      where: { slug },
      data: body,
      select: {
        id: true,
        name: true,
        slug: true,
        primaryColor: true,
        secondaryColor: true,
        textColor: true,
        logoUrl: true,
        bannerUrl: true,
      }
    });

    return NextResponse.json(academy);
  } catch (error) {
    console.error('Error updating academy:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
