export const getErrorMessage = (err: unknown): string => {
  if (err instanceof window.Error) {
    return err.message
  }
  if (typeof err === 'string') {
    return err
  }
  if (typeof err === 'object') {
    try {
      return JSON.stringify(err)
    } catch (e) {
      console.warn(e)
    }
  }
  return `unexpected error: ${err}`
}
