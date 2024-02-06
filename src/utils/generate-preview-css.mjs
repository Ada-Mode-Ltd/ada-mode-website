// import { readFile, writeFile } from 'fs/promises'
// import { copyFile } from 'fs'
// import postcss from 'postcss'
// import postcssImport from 'postcss-import'
// import postcssMixins from 'postcss-mixins'
// import postcssNested from 'postcss-nested'
// import cssnano from 'cssnano'

// console.log('Building stylesheet for preview!')
// const filepath = path.join(__dirname, 'src/_includes/assets/css/index.css')

// readFile('src/_includes/assets/css/index.css', (err, css) => {
//   postcss([autoprefixer, postcssMixins, postcssNested, postcssImport, cssnano])
//     .process(css, {
//       from: 'src/_includes/assets/css/index.css',
//       to: '_site/assets/build/index.css',
//     })
//     .then((result) => {
//       writeFile('_site/assets/build/index.css', result.css, (error) => {
//         if (error) return console.log('ERROR: ' + error)
//         console.log('The file has been saved!')
//       })
//     })
//     .catch((error) => console.log('ERROR: ' + error))
// })

async function processCSS(css) {
  postcss([postcssMixins, postcssNested, postcssImport, cssnano])
    .process(css, {
      from: 'src/_includes/assets/css/index.css',
      to: '_site/assets/build/index.css',
    })
    .then((result) => {
      console.log('writing file')
      const data = new Uint8Array(Buffer.from(result.css))
      writeFile('_site/assets/build/index.css', data).then(() =>
        console.log('file written!')
      )
    })
    .catch((error) => console.log('ERROR: ' + error))
}

async function generateCSS() {
  console.log('generating CSS')
  // try {
  //   const contents = await readFile('src/_includes/assets/css/index.css', {
  //     encoding: 'utf8',
  //   })
  //   await processCSS(contents)
  //   console.log('css generated')
  // } catch (err) {
  //   console.log('ERROR: ' + error)
  // }
}

generateCSS()
