// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name?: string;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  try {
    const { user } = req.body;
    const savedUser = await prisma.user.create({
      data: user,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: 'Something went wrong' });
  }
}
