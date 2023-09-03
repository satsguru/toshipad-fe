export const capitalize = ([first, ...rest]: any) => {
  return first.toUpperCase() + rest.join('')
}
