import prisma from '../../../lib/prisma';
import { getSession } from 'next-auth/react';

export default async function handle(req, res) {
  const { email } = req.body;

  const session = await getSession({ req });

  if (session) {
    const result = await prisma.shrimp.findMany({
      where: {
        ownerEmail: {
          equals: `${email}`,
        },
      },
    });
    // res.status(200).send(JSON.stringify(result));

    res.status(200).json(result);
  } else {
    res.status(401).send({ message: 'Unauthorized' });
  }
}
