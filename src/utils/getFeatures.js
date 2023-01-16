const { client } = require('./sanity');


async function getFeatures() {
    let query = `*[_type == "productFeature" && "am" in product->publishTo && !(_id in path("drafts.**"))]{ 
        ...,
        link{
            ...,
            internalLink{
                ...,
                _type == 'reference' => {
                    "title": @->title,
                    "slug": @->slug.current,
                },
            },
        }
     }`
    let docs = await client.fetch(query).catch(err => console.error(err));
    return docs;
}

module.exports = getFeatures;