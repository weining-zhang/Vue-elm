/**
 * 存储localStorage
 */
// export const setStore = ()

/**
 * 获取localStorage
 */
export const getStore = name => {
  if (!name)  return
  return window.localStorage.getItem(name)
}