const { client } = require("../../utils/sanity");

module.exports = async function() {
    let query = `*[_type == "quote" && "am" in publishTo] { 
        ...,
        'partner': partner->{...},
     }`
    let docs = await client.withConfig({
        token: process.env.SANITY_READ_TOKEN
    }).fetch(query).catch(err => console.error(err));
    return docs;
}