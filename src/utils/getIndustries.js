const { client } = require('./sanity');


async function getIndustries() {
    let query = `*[_type == "industry" && "am" in publishTo && !(_id in path("drafts.**"))] { 
        ...,
     }`
    let docs = await client.fetch(query).catch(err => console.error(err));
    return docs;
}

module.exports = getIndustries;