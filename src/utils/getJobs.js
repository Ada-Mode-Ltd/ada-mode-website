const { client } = require('./sanity');


async function getPeople() {
    let query = `*[_type == "job" && "am" in publishTo && open && !(_id in path("drafts.**"))]{ 
        ...,
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

module.exports = getPeople;