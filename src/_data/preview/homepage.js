const { client } = require("../../utils/sanity");

module.exports = async function() {
    let query = `*[_type == "amHomepage"]{ 
        ...,
        "feature": feature->{
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
        },
        "quotes": quotes[]->{..., partner->{...}},
        tabs{
            ...,
            sectionLink{
                ...,
                internalLink{
                    ...,
                    _type == 'reference' => {
                        "title": @->title,
                        "slug": @->slug.current,
                    },
                },
            }, 
        },
     }`
    let docs = await client.withConfig({
        token: process.env.SANITY_READ_TOKEN
    }).fetch(query).catch(err => console.error(err));
    return docs;
}