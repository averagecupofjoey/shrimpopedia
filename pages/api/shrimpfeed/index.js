import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  try {
    const result = await prisma.shrimp.findMany({
      skip: (req.query.pageNumber - 1) * 6,
      take: 6,
    });
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
}
