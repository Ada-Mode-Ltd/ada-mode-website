const { client } = require('./sanity');


async function getPartners() {
    let query = `*[_type == "partner" && "am" in publishTo && !(_id in path("drafts.**"))] { 
        ...,
     }`
    let docs = await client.fetch(query).catch(err => console.error(err));
    return docs;
}

module.exports = getPartners;