import AsyncStorage from '@react-native-async-storage/async-storage'

export const setItem = async <T>(key: string, value: T) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error('Error setting item:', error)
  }
}

export const getItem = async <T>(key: string): Promise<T | null> => {
  try {
    const value = await AsyncStorage.getItem(key)
    return value != null ? JSON.parse(value) as T : null
  } catch (error) {
    console.error('Error getting item:', error)
    return null
  }
}

export const removeItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key)
  } catch (error) {
    console.error('Error removing item:', error)
  }
}

export const mergeItem = async <T>(key: string, value: T) => {
  try {
    await AsyncStorage.mergeItem(key, JSON.stringify(value))
  } catch (error) {
    console.error('Error merging item:', error)
  }
}

export const clear = async () => {
  try {
    await AsyncStorage.clear()
  } catch (error) {
    console.error('Error clearing AsyncStorage:', error)
  }
}

export const getAllKeys = async (): Promise<string[]> => {
  try {
    const keys = await AsyncStorage.getAllKeys()
    return [...keys] // Convert to mutable array
  } catch (error) {
    console.error('Error getting all keys:', error)
    return []
  }
}


export const getAllItems = async (): Promise<Record<string, any>> => {
  try {
    const keys = await AsyncStorage.getAllKeys()
    const items = await AsyncStorage.multiGet(keys)
    return items.reduce((accumulator, [key, value]) => {
      if (value) {
        accumulator[key] = JSON.parse(value)
      }
      return accumulator
    }, {} as Record<string, any>)
  } catch (error) {
    console.error('Error getting all items:', error)
    return {}
  }
}
