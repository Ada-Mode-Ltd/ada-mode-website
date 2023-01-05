const { client } = require('./sanity');


async function getSite() {
    let query = `*[_type == "amSettings" && !(_id in path("drafts.**"))][0]{ 
        ...,
        topMenu[]{
            ...,
            _type == 'reference' => {
                "title": @->title,
                "slug": @->slug.current,
            },
        },
        footerLinks[]{
            ...,
            _type == 'reference' => {
                "title": @->title,
                "slug": @->slug.current,
            },
        }
     }`
    let docs = await client.fetch(query).catch(err => console.error(err));
    return docs;
}

module.exports = getSite;