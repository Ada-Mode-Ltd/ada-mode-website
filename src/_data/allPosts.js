const allPosts = require('../utils/getPosts');

module.exports = async function() {
    let data = await allPosts();

    // Get an array of the uniques categories used in each post
    let categories = data.reduce((acc, post) => {
        post.categories.forEach(cat => {
            if (!acc.includes(cat.title)) {
                acc.push(cat.title);
            }
        });
        return acc;
    }, []);
    
    return { data, categories };
};