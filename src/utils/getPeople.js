const { client } = require('./sanity');


async function getPeople() {
    let query = `*[_type == "person" && "am" in publishTo && !(_id in path("drafts.**"))] | order(displayOrder asc){ 
        ...,
     }`
    let docs = await client.fetch(query).catch(err => console.error(err));
    return docs;
}

module.exports = getPeople;