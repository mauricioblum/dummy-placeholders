import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { NextPage } from 'next'

const ImageParams: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    const params = router.query.imageParams
    const queryParams = params.toString().replace(/,/g, '/')
    console.log(queryParams)
    router.push(`/api/image/${queryParams}`)
  }, [])

  return <div />
}

ImageParams.getInitialProps = async ({ query }) => {
  return { query }
}

export default ImageParams
