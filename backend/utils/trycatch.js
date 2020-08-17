'use strict'

module.exports = async (f) => {
  try {
    const result = await f()
    return result
  } catch (error) {
    return {
      error: {
        message: error.message
      }
    }
  }
}
