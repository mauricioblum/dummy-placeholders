import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { cors, runMiddleware } from '../../helpers/cors'
import sharp from 'sharp'
import path from 'path'
import axios from 'axios'

const getRandomImageNumber = (max?: number): string => {
  // generate a random number between 1 and 10
  const randomInt = Math.floor(Math.random() * max + 1 || Math.random() * 11)
  return randomInt.toString()
}

const downloadImage = async (searchQuery: string) => {
  const response = await axios.get('https://pixabay.com/api', {
    params: {
      key: process.env.PIXABAY_API_KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      min_width: 1280,
      q: searchQuery
    }
  })
  const images = response.data.hits
  if (images.length) {
    let imgURL
    if (images.length === 1) {
      imgURL = response.data.hits[0].largeImageURL
    } else {
      imgURL =
        response.data.hits[getRandomImageNumber(images.length - 1)]
          .largeImageURL
    }

    const imgResponse = await axios.get(imgURL, {
      responseType: 'arraybuffer'
    })

    const imgBuffer = Buffer.from(imgResponse.data)

    return imgBuffer
  } else {
    return path.resolve('assets', 'default', 'error-default.png')
  }
}

const getImage = async (category: string): Promise<string | Buffer> => {
  switch (category) {
    case 'car':
      return path.resolve('assets', 'car', `car-${getRandomImageNumber()}.jpg`)
    case 'food':
      return path.resolve(
        'assets',
        'food',
        `food-${getRandomImageNumber()}.jpg`
      )
    case 'soccer':
      return path.resolve(
        'assets',
        'soccer',
        `soccer-${getRandomImageNumber(4)}.jpg`
      )
    default:
      return await downloadImage(category)
  }
}

function getResizedImage(
  req: NextApiRequest,
  res: NextApiResponse<any>
): NextApiHandler<any> | PromiseLike<NextApiHandler<any>> {
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

    getImage(category)
      .then((image) => {
        if (width) {
          sharp(image)
            .resize(Number(width), height ? Number(height) : Number(width), {
              fit: 'cover'
            })
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
          sharp(image)
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
      .catch((err) => console.log(err))
  })
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<NextApiHandler> => {
  await runMiddleware(req, res, cors)
  return getResizedImage(req, res)
}

export const config = {
  api: {
    bodyParser: false
  }
}
