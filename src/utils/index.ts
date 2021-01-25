export const isFalsy = (value: any) => (value === 0 ? false : !value)

export const clearObject = (obj: any) => {
  const result = { ...obj }
  Object.keys(result).forEach(key => {
    const value = obj[key]
    if (isFalsy(value)) {
      delete result[key]
    }
  })
  return result
}
