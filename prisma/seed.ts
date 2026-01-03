import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create or find Academy
  const academy = await prisma.academy.upsert({
    where: { slug: 'jj-grappling' },
    update: {
      email: 'team@jjgrapplingarts.com',
      phone: '(305)999-5634',
      address: '8200 W 33rd Ave, Bay 10',
      city: 'Hialeah',
      state: 'FL',
      zipCode: '33018',
    },
    create: {
      name: 'JJ Grappling Arts',
      slug: 'jj-grappling',
      email: 'team@jjgrapplingarts.com',
      phone: '(305)999-5634',
      address: '8200 W 33rd Ave, Bay 10',
      city: 'Hialeah',
      state: 'FL',
      zipCode: '33018',
      primaryColor: '#FF9000',
      secondaryColor: '#E66F00',
    },
  });

  // Create or find instructors
  const instructorEmails = [
    { email: 'instructor1@jjgrappling.com', firstName: 'John', lastName: 'Silva' },
    { email: 'instructor2@jjgrappling.com', firstName: 'Sarah', lastName: 'Santos' },
    { email: 'instructor3@jjgrappling.com', firstName: 'Mike', lastName: 'Johnson' },
    { email: 'instructor4@jjgrappling.com', firstName: 'Lisa', lastName: 'Rodriguez' },
  ];

  const instructors: any = {};
  for (const inst of instructorEmails) {
    const user = await prisma.user.upsert({
      where: { email: inst.email },
      update: {},
      create: {
        email: inst.email,
        password: 'hashed_password_here',
        firstName: inst.firstName,
        lastName: inst.lastName,
        role: 'INSTRUCTOR',
        academy: { connect: { id: academy.id } },
      },
    });

    const instructor = await prisma.instructor.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        bio: 'Certified BJJ and Kickboxing Instructor',
        user: { connect: { id: user.id } },
        academy: { connect: { id: academy.id } },
      },
    });

    instructors[inst.email] = instructor.id;
  }

  // Define complete class schedule
  const classesData = [
    // MONDAY (1)
    { name: 'Adult Gi - All Levels', classType: 'ADULT_BJJ', dayOfWeek: 1, startTime: '06:00', endTime: '07:00' },
    { name: 'Adult Kickboxing', classType: 'KICKBOXING', dayOfWeek: 1, startTime: '07:00', endTime: '08:00' },
    { name: 'Little Rollers BJJ - Age 3-5', classType: 'YOUTH_BJJ', dayOfWeek: 1, startTime: '14:30', endTime: '15:15' },
    { name: 'Beginners Gi - Age 5-8', classType: 'YOUTH_BJJ', dayOfWeek: 1, startTime: '15:30', endTime: '16:15' },
    { name: 'Beginners Gi - Age 9-12', classType: 'YOUTH_BJJ', dayOfWeek: 1, startTime: '16:30', endTime: '17:15' },
    { name: 'Kids Gi - All Levels - Age 5-12', classType: 'YOUTH_BJJ', dayOfWeek: 1, startTime: '17:30', endTime: '18:15' },
    { name: 'Advanced Gi - Age 7-12', classType: 'YOUTH_BJJ', dayOfWeek: 1, startTime: '18:30', endTime: '19:15' },
    { name: 'Adult Gi - All Levels', classType: 'ADULT_BJJ', dayOfWeek: 1, startTime: '19:30', endTime: '20:30' },
    { name: 'Teen Gi - All Levels - Age 13+', classType: 'YOUTH_BJJ', dayOfWeek: 1, startTime: '19:30', endTime: '20:30' },
    { name: 'Adult Kickboxing', classType: 'KICKBOXING', dayOfWeek: 1, startTime: '20:30', endTime: '21:30' },
    { name: 'Teen Kickboxing', classType: 'KICKBOXING', dayOfWeek: 1, startTime: '20:30', endTime: '21:30' },

    // TUESDAY (2)
    { name: 'Adult No-Gi - All Levels', classType: 'ADULT_BJJ', dayOfWeek: 2, startTime: '06:00', endTime: '07:00' },
    { name: 'Adult Kickboxing', classType: 'KICKBOXING', dayOfWeek: 2, startTime: '07:00', endTime: '08:00' },
    { name: 'Little Rollers BJJ - Age 3-5', classType: 'YOUTH_BJJ', dayOfWeek: 2, startTime: '14:30', endTime: '15:15' },
    { name: 'Beginners Gi - Age 5-8', classType: 'YOUTH_BJJ', dayOfWeek: 2, startTime: '15:30', endTime: '16:15' },
    { name: 'Kids Kickboxing - Ages 7-12', classType: 'KICKBOXING', dayOfWeek: 2, startTime: '16:30', endTime: '17:15' },
    { name: 'Kids No-Gi - All Levels - Age 5-12', classType: 'YOUTH_BJJ', dayOfWeek: 2, startTime: '17:30', endTime: '18:15' },
    { name: 'Advanced No-Gi - Age 7-12', classType: 'YOUTH_BJJ', dayOfWeek: 2, startTime: '18:30', endTime: '19:15' },
    { name: 'Adult No-Gi - All Levels', classType: 'ADULT_BJJ', dayOfWeek: 2, startTime: '19:30', endTime: '20:30' },
    { name: 'Teen No-Gi - All Levels - Age 13+', classType: 'YOUTH_BJJ', dayOfWeek: 2, startTime: '19:30', endTime: '20:30' },
    { name: 'Adult Kickboxing', classType: 'KICKBOXING', dayOfWeek: 2, startTime: '20:30', endTime: '21:30' },
    { name: 'Teen Kickboxing', classType: 'KICKBOXING', dayOfWeek: 2, startTime: '20:30', endTime: '21:30' },

    // WEDNESDAY (3) - Same as Monday
    { name: 'Adult Gi - All Levels', classType: 'ADULT_BJJ', dayOfWeek: 3, startTime: '06:00', endTime: '07:00' },
    { name: 'Adult Kickboxing', classType: 'KICKBOXING', dayOfWeek: 3, startTime: '07:00', endTime: '08:00' },
    { name: 'Little Rollers BJJ - Age 3-5', classType: 'YOUTH_BJJ', dayOfWeek: 3, startTime: '14:30', endTime: '15:15' },
    { name: 'Beginners Gi - Age 5-8', classType: 'YOUTH_BJJ', dayOfWeek: 3, startTime: '15:30', endTime: '16:15' },
    { name: 'Beginners Gi - Age 9-12', classType: 'YOUTH_BJJ', dayOfWeek: 3, startTime: '16:30', endTime: '17:15' },
    { name: 'Kids Gi - All Levels - Age 5-12', classType: 'YOUTH_BJJ', dayOfWeek: 3, startTime: '17:30', endTime: '18:15' },
    { name: 'Advanced Gi - Age 7-12', classType: 'YOUTH_BJJ', dayOfWeek: 3, startTime: '18:30', endTime: '19:15' },
    { name: 'Adult Gi - All Levels', classType: 'ADULT_BJJ', dayOfWeek: 3, startTime: '19:30', endTime: '20:30' },
    { name: 'Teen Gi - All Levels - Age 13+', classType: 'YOUTH_BJJ', dayOfWeek: 3, startTime: '19:30', endTime: '20:30' },
    { name: 'Adult Kickboxing', classType: 'KICKBOXING', dayOfWeek: 3, startTime: '20:30', endTime: '21:30' },
    { name: 'Teen Kickboxing', classType: 'KICKBOXING', dayOfWeek: 3, startTime: '20:30', endTime: '21:30' },

    // THURSDAY (4) - Same as Tuesday
    { name: 'Adult No-Gi - All Levels', classType: 'ADULT_BJJ', dayOfWeek: 4, startTime: '06:00', endTime: '07:00' },
    { name: 'Adult Kickboxing', classType: 'KICKBOXING', dayOfWeek: 4, startTime: '07:00', endTime: '08:00' },
    { name: 'Little Rollers BJJ - Age 3-5', classType: 'YOUTH_BJJ', dayOfWeek: 4, startTime: '14:30', endTime: '15:15' },
    { name: 'Beginners Gi - Age 5-8', classType: 'YOUTH_BJJ', dayOfWeek: 4, startTime: '15:30', endTime: '16:15' },
    { name: 'Kids Kickboxing - Ages 7-12', classType: 'KICKBOXING', dayOfWeek: 4, startTime: '16:30', endTime: '17:15' },
    { name: 'Kids No-Gi - All Levels - Age 5-12', classType: 'YOUTH_BJJ', dayOfWeek: 4, startTime: '17:30', endTime: '18:15' },
    { name: 'Advanced No-Gi - Age 7-12', classType: 'YOUTH_BJJ', dayOfWeek: 4, startTime: '18:30', endTime: '19:15' },
    { name: 'Adult No-Gi - All Levels', classType: 'ADULT_BJJ', dayOfWeek: 4, startTime: '19:30', endTime: '20:30' },
    { name: 'Teen No-Gi - All Levels - Age 13+', classType: 'YOUTH_BJJ', dayOfWeek: 4, startTime: '19:30', endTime: '20:30' },
    { name: 'Adult Kickboxing', classType: 'KICKBOXING', dayOfWeek: 4, startTime: '20:30', endTime: '21:30' },
    { name: 'Teen Kickboxing', classType: 'KICKBOXING', dayOfWeek: 4, startTime: '20:30', endTime: '21:30' },

    // FRIDAY (5) - Same as Monday
    { name: 'Adult Gi - All Levels', classType: 'ADULT_BJJ', dayOfWeek: 5, startTime: '06:00', endTime: '07:00' },
    { name: 'Adult Kickboxing', classType: 'KICKBOXING', dayOfWeek: 5, startTime: '07:00', endTime: '08:00' },
    { name: 'Little Rollers BJJ - Age 3-5', classType: 'YOUTH_BJJ', dayOfWeek: 5, startTime: '14:30', endTime: '15:15' },
    { name: 'Beginners Gi - Age 5-8', classType: 'YOUTH_BJJ', dayOfWeek: 5, startTime: '15:30', endTime: '16:15' },
    { name: 'Beginners Gi - Age 9-12', classType: 'YOUTH_BJJ', dayOfWeek: 5, startTime: '16:30', endTime: '17:15' },
    { name: 'Kids Gi - All Levels - Age 5-12', classType: 'YOUTH_BJJ', dayOfWeek: 5, startTime: '17:30', endTime: '18:15' },
    { name: 'Advanced Gi - Age 7-12', classType: 'YOUTH_BJJ', dayOfWeek: 5, startTime: '18:30', endTime: '19:15' },
    { name: 'Adult Gi - All Levels', classType: 'ADULT_BJJ', dayOfWeek: 5, startTime: '19:30', endTime: '20:30' },
    { name: 'Teen Gi - All Levels - Age 13+', classType: 'YOUTH_BJJ', dayOfWeek: 5, startTime: '19:30', endTime: '20:30' },
    { name: 'Adult Kickboxing', classType: 'KICKBOXING', dayOfWeek: 5, startTime: '20:30', endTime: '21:30' },
    { name: 'Teen Kickboxing', classType: 'KICKBOXING', dayOfWeek: 5, startTime: '20:30', endTime: '21:30' },

    // SATURDAY (6)
    { name: 'Little Rollers BJJ - Age 3-5', classType: 'YOUTH_BJJ', dayOfWeek: 6, startTime: '10:00', endTime: '10:45' },
  ];

  // Create or update classes
  const instructorIds = Object.values(instructors);
  // Clear existing classes
  await prisma.class.deleteMany({
    where: { academyId: academy.id }
  });

  let instructorIndex = 0;

  for (const classData of classesData) {
    const instructorId = instructorIds[instructorIndex % instructorIds.length];
    instructorIndex++;

    await prisma.class.create({
      data: {
        name: classData.name,
        classType: classData.classType,
        dayOfWeek: classData.dayOfWeek,
        startTime: classData.startTime,
        endTime: classData.endTime,
        instructor: {
          connect: { id: instructorId },
        },
        academy: {
          connect: { id: academy.id },
        },
      },
    });
  }

  console.log('✅ Seed data synced successfully!');
  console.log('Academy:', academy.name);
  console.log('Total classes:', classesData.length);
  console.log('Email:', academy.email);
  console.log('Phone:', academy.phone);
  console.log('Address:', `${academy.address}, ${academy.city}, ${academy.state} ${academy.zipCode}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
