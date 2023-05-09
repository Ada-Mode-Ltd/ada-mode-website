const { client } = require('./sanity');


async function getHomepage() {
    let query = `*[_type == "amHomepage" && !(_id in path("drafts.**"))][0]{ 
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
        "partnerArray": partners.partners[]->{...},
        "quote": quote[]->{..., partner->{...}},
        "smallCaseStudies": smallCaseStudies[]{
            ...,
            caseStudy->{
                ...,
            },
        },
        "featuredCaseStudies": featuredCaseStudies[]->{
            ...,
        }
     }`
    let docs = await client.fetch(query).catch(err => console.error(err));
    return docs;
}

module.exports = getHomepage;