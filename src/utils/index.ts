import { flattenDeep, omit } from "lodash/fp"

const recursiveSetKey = (data, parentKey = "") =>
  data.map((x, i) => {
    const key = parentKey ? `${parentKey}.${i}` : `${i}`
    // console.log(parentKey, key);
    if (x.children) {
      x.children = recursiveSetKey(x.children, `${key}.children`)
    }
    return {
      ...x,
      key: parentKey ? `${parentKey}.${i}` : i.toString()
    }
  })

const recursiveGetKey = data =>
  data.reduce((acc, cur) => {
    const nextAcc = [...acc, cur.key]
    if (cur.children) {
      return [...nextAcc, ...recursiveGetKey(cur.children)]
    }
    return nextAcc
  }, [])

const isEmptyValue = data =>
  data.some(x => {
    if (x.value) return true
    if (x.children) return isEmptyValue(x.children)
    return false
  })

const recursiveOmitKey = (keys, data) =>
  data.map(x => {
    if (x.children) x.children = recursiveOmitKey(keys, x.children)
    return omit(keys, x)
  })

const isJSON = value => {
  if (value === "null") return false
  try {
    JSON.parse(value)
  } catch (e) {
    // console.error('checkIfJson', value)
    return false
  }
  return true
}

const getFormData = data =>
  data.reduce((acc, cur) => {
    // console.log(acc, cur)
    if (cur.type === "array") {
      acc[cur.name] = cur.children
        .filter(x => isEmptyValue([x]))
        .map(x => getFormData(x.children))
    } else if (cur.children) {
      const value = getFormData(cur.children)
      Object.keys(value).length > 0 && (acc[cur.name] = value)
    } else if (cur.value) {
      acc[cur.name] =
        cur.type === "JSON" && isJSON(cur.value)
          ? JSON.parse(cur.value)
          : cur.value
    }
    return acc
  }, {})

export {
  recursiveSetKey,
  recursiveGetKey,
  getFormData,
  recursiveOmitKey,
  isJSON
}
