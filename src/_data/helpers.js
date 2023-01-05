function currentYear() {
    let today = new Date();
    return today.getFullYear();
  }

module.exports = async function() {
    let year = currentYear();
    return { year };
  };