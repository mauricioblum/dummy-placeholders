/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Cors from 'cors'
import { NextApiRequest, NextApiResponse } from 'next'

// Initializing the cors middleware
export const cors = Cors({
  methods: ['GET', 'HEAD']
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
export function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: any
): Promise<void> {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}
