module.exports = {
  format_date: (date) => {
    return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
  },
  // orderById: function(instructions) {
  //     if (!Array.isArray(instructions)) {
  //         return [];
  //     }
  //     return instructions.slice().sort((a, b) => a.id - b.id);
  // }
}

