// import { NextApiRequest, NextApiResponse } from 'next';
// import prisma from '../../../lib/prisma';
import prisma from '../../../lib/prisma';
import { getSession } from 'next-auth/react';

// POST /api/shrimp
// Required fields in body: all except notes and sale notes
// Optional fields in body: notes and sale notes
export default async function handle(req, res) {
  const {
    name,
    species,
    waterType,
    photo,
    notes,
    sell,
    saleInfo,
    colorOne,
    colorTwo,
    morphType,
  } = req.body;

  const session = await getSession({ req });
  if (session) {
    const result = await prisma.shrimp.create({
      data: {
        name: name,
        species: species,
        waterType: waterType,
        image: photo,
        notes: notes,
        colorOne: colorOne,
        colorTwo: colorTwo,
        morphType: morphType,
        sale: sell,
        saleInfo: saleInfo,
        owner: { connect: { email: session?.user?.email } },
      },
    });
    res.json(result);
  } else {
    res.status(401).send({ message: 'Unauthorized' });
  }
}

// model Shrimp {
//   id            String    @id @default(cuid())
//   name          String
//   sciName       String
//   waterType     String
//   image         String
//   notes         String?
//   sale          Boolean
//   saleNotes     String?
//   createdAt     DateTime  @default(now()) @map(name: "created_at")
//   updatedAt     DateTime  @updatedAt @map(name: "updated_at")
//   owner         User      @relation(fields: [ownerEmail], references: [email])
//   ownerEmail    String
// }
