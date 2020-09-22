import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import sharp from 'sharp'
import path from 'path'

const getImage = (category: string): string => {
  if (category === 'car') {
    return path.resolve('assets', 'car', 'car.jpg')
  } else if (category === 'food') {
    return path.resolve('assets', 'food', 'food.jpg')
  } else {
    return path.resolve('assets', 'soccer', 'soccer.jpg')
  }
}

export default (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<NextApiHandler> => {
  return new Promise((resolve, reject) => {
    const {
      query: { params }
    } = req

    res.setHeader('Content-Type', 'image/jpeg')
    const category = params[0]
    const width = params[1]
    const height = params[2]

    if (!category) {
      reject(new Error('No Category'))
      return res.send({ error: 'No category specified!' })
    }

    if (width && height) {
      sharp(getImage(category))
        .resize(Number(width), Number(height), { fit: 'fill' })
        .toBuffer()
        .then((data) => {
          res.send(data)
          resolve()
        })
        .catch((err) => {
          res.send({ error: true })
          reject(new Error(err))
        })
    } else if (width) {
      sharp(getImage(category))
        .resize(Number(width), null)
        .toBuffer()
        .then((data) => {
          res.send(data)
          resolve()
        })
        .catch((err) => {
          res.send({ error: true })
          reject(new Error(err))
        })
    } else {
      sharp(getImage(category))
        .toBuffer()
        .then((data) => {
          res.send(data)
          resolve()
        })
        .catch((err) => {
          res.send({ error: true })
          reject(new Error(err))
        })
    }
  })
}

export const config = {
  api: {
    bodyParser: false
  }
}
