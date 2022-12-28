const getCaseStudies = require('../utils/getCaseStudies');

module.exports = async function() {
    let data = await getCaseStudies();
    return data;
};