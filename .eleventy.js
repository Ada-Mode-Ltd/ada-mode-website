const EleventyPluginNavigation = require('@11ty/eleventy-navigation')
const EleventyVitePlugin = require('@11ty/eleventy-plugin-vite')
const { EleventyServerlessBundlerPlugin } = require('@11ty/eleventy')

const imageShortcode = require('./src/_11ty/shortcodes/image')
const { dateFormat, w3cDate } = require('./src/_11ty/filters/date')
const { sanityImageUrl } = require('./src/_11ty/shortcodes/sanityImageUrl')
const portableText = require('./src/_11ty/shortcodes/portableText')
const getReferences = require('./src/_11ty/shortcodes/getReference')

const dev = process.env.NODE_ENV === 'production' ? false : true
const isServerless = process.env.ELEVENTY_SERVERLESS || false

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter('w3cDate', w3cDate)
  eleventyConfig.addFilter('dateFormat', dateFormat)
  eleventyConfig.addFilter('makeArray', function (obj) {
    return [obj]
  })
  eleventyConfig.addFilter('setId', function (content) {
    return content?._key || content?._id || new Date().getTime()
  })

  eleventyConfig.addFilter('getRelatedPosts', function (posts, post) {
    // Get the tags from the post
    const tags = post.categories.map((c) => c.title)
    // Filter out the current post
    const relatedPosts = posts
      .filter((p) => p._id !== post._id)
      .filter((p) => p.categories.some((t) => tags.includes(t.title)))
    // Ensure that 3 related posts are returned, or add more if there are not enough
    if (relatedPosts.length < 3) {
      const morePosts = posts
        .filter((p) => p._id !== post._id)
        .filter((p) => !p.categories.some((t) => tags.includes(t.title)))
      relatedPosts.push(...morePosts.slice(0, 3 - relatedPosts.length))
    }

    return relatedPosts
  })

  eleventyConfig.addFilter('getRelatedCaseStudies', function (posts, post) {
    // Get the tags from the post
    const tags = post.categories.map((c) => c.title)
    // Filter out the current post
    const relatedPosts = posts
      .filter((p) => p._id !== post._id)
      .filter((p) => p.categories.some((t) => tags.includes(t.title)))
    // Ensure that 3 related posts are returned, or add more if there are not enough
    if (relatedPosts.length < 4) {
      const morePosts = posts
        .filter((p) => p._id !== post._id)
        .filter((p) => !p.categories.some((t) => tags.includes(t.title)))
      relatedPosts.push(...morePosts.slice(0, 4 - relatedPosts.length))
    }

    return relatedPosts
  })

  // Shortcodes
  eleventyConfig.addPairedShortcode('postcss', async (code) => {
    // for relative path CSS imports
    const filepath = path.join(__dirname, 'src/_includes/assets/css/index.css')

    return await postcss([
      autoprefixer,
      postcssMixins,
      postcssNested,
      postcssImport,
    ])
      .process(code, { from: filepath })
      .then((result) => result.css)
  })

  eleventyConfig.addShortcode('image', imageShortcode) // Because copyright text in the footer ...
  eleventyConfig.addShortcode(
    'currentYear',
    () => `${new Date().getFullYear()}`
  ) // Because copyright text in the footer ...
  eleventyConfig.addShortcode('sanityImageUrl', sanityImageUrl)
  eleventyConfig.addLiquidShortcode('portableText', portableText)
  eleventyConfig.addShortcode('getReferences', getReferences)

  /* Analytics */
  eleventyConfig.addShortcode('analyticsScript', () => {
    if (dev || isServerless)
      return `<script>console.log('Cabin analytics')</script>`
    return `<!-- Cabin analytics -->
      <script async defer src="https://scripts.withcabin.com/hello.js"></script>`
  })

  eleventyConfig.addPlugin(EleventyPluginNavigation)

  eleventyConfig.addPlugin(EleventyServerlessBundlerPlugin, {
    name: 'preview',
    functionsDir: './netlify/functions/',
  })

  eleventyConfig.addPlugin(EleventyServerlessBundlerPlugin, {
    name: 'preview', // The serverless function name from your permalink object
    functionsDir: './netlify/functions/',
    copy: [
      'src/_includes/assets/css/build.css',
      { from: 'src/_includes/assets/js' },
    ],
    excludeDependencies: ['rollup-plugin-critical'],
  })

  eleventyConfig.addPlugin(EleventyVitePlugin, {
    tempFolderName: '.11ty-vite', // Default name of the temp folder

    // Vite options (equal to vite.config.js inside project root)
    viteOptions: {
      publicDir: 'public',
      clearScreen: false,
      server: {
        mode: 'development',
        middlewareMode: true,
      },
      appType: 'custom',
      assetsInclude: ['**/*.xml', '**/*.txt'],
      build: {
        mode: 'production',
        sourcemap: 'true',
        manifest: true,
        // This puts CSS and JS in subfolders – remove if you want all of it to be in /assets instead
        rollupOptions: {
          output: {
            assetFileNames: 'assets/css/[name].[hash].css',
            chunkFileNames: 'assets/js/[name].[hash].js',
            entryFileNames: 'assets/js/[name].[hash].js',
          },
        },
      },
    },
  })

  // Maybe you want to ignore these files in production later
  // if (!dev) {
  //     eleventyConfig.ignores.add("src/design-system/**");
  // }
  eleventyConfig.addPassthroughCopy('src/_includes/assets/css')
  eleventyConfig.addPassthroughCopy('src/_includes/assets/js')
  eleventyConfig.addPassthroughCopy('public/images/*')
  eleventyConfig.addPassthroughCopy('public/assets/**/*')

  // Return your Object options:
  return {
    dir: {
      input: 'src',
      output: '_site',
      includes: '_includes',
      layouts: '_layouts',
      htmlTemplateEngine: 'liquid',
    },
  }
}
