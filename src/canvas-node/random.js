exports.getColor = () => {
  const r = Math.floor(Math.random() * 256),
    g = Math.floor(Math.random() * 256),
    b = Math.floor(Math.random() * 256);
  return `rgba(${r},${g},${b},0.8)`;
};

exports.getNumber = (min, max) => {
  return min + Math.random() * (max - min);
};
