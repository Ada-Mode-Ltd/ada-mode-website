const { client } = require('./sanity');

async function getCaseStudies() {
    let query = `*[_type == "caseStudy" && "am" in publishTo && !(_id in path("drafts.**"))] | order(publishedAt desc){ 
        ...,
        "description": coalesce(description, blurb),
        "categories": categories[]->{...},
        "author": author->{...},
        "slides": {
          "title": slides.title,
          "url": slides.asset->url,
        },
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

module.exports = getCaseStudies;