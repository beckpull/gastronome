module.exports = {
    format_date: (date) => {
      return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
    },
    orderById: function (arr) {
        return arr.sort((a, b) => a.id - b.id);
      }
}

