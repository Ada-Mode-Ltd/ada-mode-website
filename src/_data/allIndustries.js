const industries = require('../utils/getIndustries');

module.exports = async function() {
    let data = await industries();
    return data;
};