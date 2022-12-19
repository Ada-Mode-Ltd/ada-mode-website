const { client } = require('./sanity');

async function getPosts() {
    let query = `*[_type == "post" && "am" in publishTo && !(_id in path("drafts.**"))] | order(publishedAt desc){ 
        ...,
        "description": coalesce(description, blurb),
        "categories": categories[]->{...},
        "author": author->{...},
        body{
            ...,
            content[]{
                ...,
                markDefs[] {
                  ...,
                  _type == "internalLink" => {
                    ...,
                    "slug": @.reference-> slug
                  }
                }
            }
          } 
     }`
    let docs = await client.fetch(query).catch(err => console.error(err));
    return docs;
}

module.exports = getPosts;