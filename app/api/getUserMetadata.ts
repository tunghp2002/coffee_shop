import { clerkClient, getAuth } from '@clerk/nextjs/server';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const user = await clerkClient.users.getUser(userId);
    res.status(200).json(user.privateMetadata);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user metadata' });
  }
}
