const partners = require('../utils/getPartners');

module.exports = async function() {
    let data = await partners();
    return data;
};