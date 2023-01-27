// import { NextApiRequest, NextApiResponse } from 'next';
// import prisma from '../../../lib/prisma';
import prisma from '../../../lib/prisma';
import { getSession } from 'next-auth/react';

// POST /api/shrimp
// Required fields in body: all except notes and sale notes
// Optional fields in body: notes and sale notes
export default async function handle(req, res) {
  if (req.method === 'POST') {
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
      gender,
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
          gender,
          owner: { connect: { email: session?.user?.email } },
          owner_id: { connect: { id: session?.user?.id } },
        },
      });
      res.json(result);
    } else {
      res.status(401).send({ message: 'Unauthorized' });
    }
  }
  if (req.method === 'GET') {
    console.log('OK WE IN THIS THING', req.query);
    const { ...args } = req.query;
    console.log(args);

    const filter = {
      where: {},
    };
    if (args.search) {
      filter.where.OR = [
        {
          species: {
            contains: args.search,
          },
        },
        {
          name: {
            contains: args.search,
          },
        },
      ];
    } else {
      if (args.species !== '') {
        filter.where.species.equals = args.species;
      }

      if (args.name !== '') {
        filter.where.name = args.name;
      }

      if (args.colorOne !== '') {
        filter.where.colorOne = args.colorOne;
      }

      if (args.colorTwo !== '') {
        filter.where.colorTwo = args.colorTwo;
      }

      if (args.morphType !== '') {
        filter.where.morphType = args.morphType;
      }

      if (args.waterType !== '') {
        filter.where.waterType = args.waterType;
      }

      if (args.forSale !== '') {
        filter.where.sale = args.forSale;
      }
    }

    try {
      console.log('LOOK A GET REQUEST');
      // const { shrimpID } = req.body;
      console.log(req.query);

      const result = await prisma.shrimp.findMany(filter);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
    }
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
