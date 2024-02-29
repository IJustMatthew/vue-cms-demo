export const setStorageItem = (name: string, value: any): void => {
  localStorage.setItem(name, value)
}

export const getStorageItem = <T>(name: string): null | string | T => {
  if (localStorage.getItem(name) === null) return null
  const returnData = localStorage.getItem(name) || ''
  return returnData
}

export const deleteStorageItem = (name: string): void => {
  localStorage.removeItem(name)
}

export const clearStorage = (): void => {
  localStorage.clear()
}
