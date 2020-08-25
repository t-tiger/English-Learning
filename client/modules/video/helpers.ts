export const formatCaptionTime = (time: number): string => {
  const rounded = Math.round(time)
  const min = Math.floor(rounded / 60)
  const sec = Math.floor(rounded % 60)
  return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
}
