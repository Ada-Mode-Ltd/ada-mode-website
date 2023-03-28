const { client } = require("../../utils/sanity");

module.exports = async function() {
    let query = `*[_type == "page" && publishTo == "am"]{ 
      ...,
      body[]{
          ...,
          _type == "reference" => {
              ...,
          },
      _type == 'productFeatures' =>{
          ...,
          features[]->{
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
          }
      },
      _type == 'careers' => {
          ...,
          jobs[]->{
              ...,
          },
      },
      _type == 'people' => {
          ...,
          people[]->{
              ...,
          },
      },
      _type == 'quoteCarousel' => {
          ...,
          quotes[]->{
            ...,
            partner->{
                      ...,
                  },
      }
          }
      },  
   }`
    let docs = await client.withConfig({
        token: process.env.SANITY_READ_TOKEN
    }).fetch(query).catch(err => console.error(err));
    return docs;
}