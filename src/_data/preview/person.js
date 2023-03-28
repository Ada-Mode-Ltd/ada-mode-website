const { client } = require("../../utils/sanity");

module.exports = async function() {
    let query = `*[_type == "person" && "am" in publishTo] { 
        ...
     }`
    let docs = await client.withConfig({
        token: process.env.SANITY_READ_TOKEN
    }).fetch(query).catch(err => console.error(err));
    return docs;
}