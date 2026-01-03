import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/classes - Get all classes for an academy
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const academyId = searchParams.get('academyId');
    const academySlug = searchParams.get('slug');

    // Look up academy either by ID or slug
    let academy;
    if (academyId) {
      // Try as ID first, then as slug if ID doesn't work
      academy = await prisma.academy.findUnique({ where: { id: academyId } });
      if (!academy) {
        academy = await prisma.academy.findUnique({ where: { slug: academyId } });
      }
    } else if (academySlug) {
      academy = await prisma.academy.findUnique({ where: { slug: academySlug } });
    } else {
      return NextResponse.json(
        { error: 'Academy ID or slug is required' },
        { status: 400 }
      );
    }

    if (!academy) {
      return NextResponse.json(
        { error: 'Academy not found' },
        { status: 404 }
      );
    }

    // Get classes with instructor info
    const classes = await prisma.class.findMany({
      where: { academyId: academy.id },
      include: {
        instructor: {
          include: { user: true }
        },
      },
      orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }]
    });

    return NextResponse.json(classes);
  } catch (error) {
    console.error('Error fetching classes:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/classes - Create a new class
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, dayOfWeek, startTime, endTime, maxCapacity, beltLevel, instructorId, academyId } = body;

    if (!name || dayOfWeek === undefined || !startTime || !endTime || !instructorId || !academyId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create class
    const newClass = await prisma.class.create({
      data: {
        name,
        description,
        dayOfWeek,
        startTime,
        endTime,
        instructorId,
        academyId,
      },
      include: {
        instructor: { include: { user: true } },
        enrollments: true,
      }
    });

    return NextResponse.json(newClass, { status: 201 });
  } catch (error) {
    console.error('Error creating class:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
