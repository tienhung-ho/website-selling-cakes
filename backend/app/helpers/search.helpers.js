module.exports = (name) => {
  return { name: { $regex: new RegExp(name, 'i') } };
};
