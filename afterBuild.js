const { constants, cp } = require('fs')
const { access } = require('fs/promises')

const dev = process.env.NODE_ENV === 'production' ? false : true
const isServerless = process.env.ELEVENTY_SERVERLESS || false

const copyImages = async () => {
  try {
    await access('public/assets/img/remote', constants.R_OK | constants.W_OK)
    await access('_site/assets/img/remote', constants.R_OK | constants.W_OK)
    cp('public/assets/img/remote', '_site/assets/img/remote', { recursive: true }, (err) => {
      if (err) console.error(err)
      else console.log('copied remote images')
    })
  } catch (err) {
    console.error(err)
  }
}

if (!dev || !isServerless) copyImages()