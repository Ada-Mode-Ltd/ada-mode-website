const Image = require('@11ty/eleventy-img')
// const { cache } = require("@11ty/eleventy/src/TemplateCache");

async function imageShortcode(src, alt = '', loading = 'lazy', sizes = '') {
  // let formats = src.includes('.gif')
  //   ? ['webp', 'gif']
  //   : ['avif', 'webp', 'svg', 'jpeg']

  let directory = '.cache'

  if (process.env.ELEVENTY_SERVERLESS) {
    return `<img src="${src}" alt="${alt}">`
  }

  let metadata = await Image(src, {
    cacheOptions: {
      directory,
      duration: '30d',
      removeUrlQueryParams: false,
    },
    formats: ['webp', 'avif', 'webp', 'svg', 'jpeg'],
    outputDir: './public/assets/img/remote/',

    sharpOptions: {
      animated: true,
    },
    svgShortCircuit: true,

    urlPath: '/assets/img/remote/',
  })

  let imageAttributes = {
    alt,
    decoding: 'async',
    loading,
    sizes,
  }

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return Image.generateHTML(metadata, imageAttributes)
}

module.exports = imageShortcode
