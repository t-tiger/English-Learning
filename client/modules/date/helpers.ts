export const parseDateTxt = (dateTxt: string): string => {
  const d = new Date(dateTxt)
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
}
