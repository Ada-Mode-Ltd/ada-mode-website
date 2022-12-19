const allPosts = require('../utils/getPosts');

module.exports = async function() {
    let data = await allPosts();
    let features = await data.filter(doc => doc.featured);
    let feature = features.length > 0 ? features[0] : data[0];
    let posts = data.filter(doc => doc._id !== feature?._id);

    // combine feature and posts
    let combined = [feature, ...posts];

    // Get an array of the uniques categories used in each post
    let categories = posts.reduce((acc, post) => {
        post.categories.forEach(cat => {
            if (!acc.includes(cat.title)) {
                acc.push(cat.title);
            }
        });
        return acc;
    }, []);

    return { feature, posts, categories, combined };
};