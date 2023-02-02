import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  if (req.method === 'GET') {
    try {
      // console.log('LOOK A GET REQUEST');
      // const { shrimpID } = req.body;
      // console.log('Entire req****', req);
      // console.log(req.query);
      const userid = req.headers.userid;

      const result = await prisma.shrimp.findMany({
        where: {
          id: {
            equals: `${req.query.id}`,
          },
          ownerId: {
            equals: userid,
          },
        },
      });
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
    }
  }
  if (req.method === 'PATCH') {
    const userid = req.headers.userid;
    try {
      const {
        shrimpId,
        name,
        species,
        waterType,
        notes,
        sell,
        saleInfo,
        colorOne,
        colorTwo,
        morphType,
        gender,
      } = req.body;

      const result = await prisma.shrimp.updateMany({
        where: {
          id: {
            equals: shrimpId,
          },
          ownerId: {
            equals: userid,
          },
        },
        data: {
          name: name,
          species: species,
          waterType: waterType,
          notes: notes,
          colorOne: colorOne,
          colorTwo: colorTwo,
          morphType: morphType,
          sale: sell,
          saleInfo: saleInfo,
          gender,
          // owner: { connect: { email: session?.user?.email } },
          // owner_id: { connect: { id: session?.user?.id } },
        },
      });
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  }
  // res.status(401).send({ message: 'Unauthorized' });
}
