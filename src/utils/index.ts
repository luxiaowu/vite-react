const recursiveSetKey = (data, parentKey = '') => data.map((x, i) => {
  const key = parentKey ? `${parentKey}.${i}` : `${i}`;
  // console.log(parentKey, key);
  if (x.children) {
    x.children = recursiveSetKey(x.children, `${key}.children`);
  }
  return {
    ...x,
    key: parentKey ? `${parentKey}.${i}` : i.toString()
  }
})

export { recursiveSetKey }