import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  try {
    const result = await prisma.shrimp.findMany({
      where: {
        id: {
          equals: `${req.query.id}`,
        },
      },
    });
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
}
