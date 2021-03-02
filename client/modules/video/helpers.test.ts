import {
  extractYoutubeVideoId,
  findVideoThumb,
  formatCaptionTime,
} from 'modules/video/helpers'

describe('findVideoThumb', () => {
  it("returns same size as specified one if there's matched size", () => {
    const thumbs = {
      medium: { url: 'medium', width: 0, height: 0 },
      high: { url: 'high', width: 1, height: 1 },
      default: { url: 'default', width: 2, height: 2 },
    }
    expect(findVideoThumb(thumbs, 'medium')).toEqual(thumbs.medium)
    expect(findVideoThumb(thumbs, 'high')).toEqual(thumbs.high)
  })
  it("returns default size if there's not matched size", () => {
    const thumbs = {
      maxres: { url: 'maxres', width: 0, height: 0 },
      default: { url: 'default', width: 2, height: 2 },
    }
    expect(findVideoThumb(thumbs, 'high')).toEqual(thumbs.default)
    expect(findVideoThumb(thumbs, 'standard')).toEqual(thumbs.default)
  })
})

describe('formatCaptionTime', () => {
  it('minute and second digits are two digits even if either is one digit originally', () => {
    expect(formatCaptionTime(145)).toBe('02:25')
    expect(formatCaptionTime(605)).toBe('10:05')
  })
  it('minute part can be three digits if numSec is greater than 5999', () => {
    expect(formatCaptionTime(6000)).toBe('100:00')
  })
  it('minute part is filled with 00 if numSec is less than 60', () => {
    expect(formatCaptionTime(50)).toBe('00:50')
  })
  it('second part is filled with two digit if numSec is less than 10', () => {
    expect(formatCaptionTime(5)).toBe('00:05')
  })
})

describe('extractYoutubeVideoId', () => {
  it('succeed to extract youtubeID from URL with valid format', () => {
    expect(
      extractYoutubeVideoId('https://www.youtube.com/watch?v=92UtWLqRH7M'),
    ).toBe('92UtWLqRH7M')
    expect(
      extractYoutubeVideoId(
        'https://www.youtube.com/watch?v=92UtWLqRH7M&ab_channel=MSNBC',
      ),
    ).toBe('92UtWLqRH7M')
    expect(
      extractYoutubeVideoId(
        'https://www.youtube.com/watch?ab_channel=MSNBC&v=92UtWLqRH7M',
      ),
    ).toBe('92UtWLqRH7M')
  })
  it('succeed to extract youtubeID from text which only contains video id', () => {
    expect(extractYoutubeVideoId('92UtWLqRH7M')).toBe('92UtWLqRH7M')
  })
  it('returns null if URL does not contain v= within URL params', () => {
    expect(
      extractYoutubeVideoId('https://www.youtube.com/watch?ab_channel=MSNBC'),
    ).toEqual(null)
  })
  it('returns null if text is not URL and does not contain v= in it', () => {
    expect(extractYoutubeVideoId('dummy text')).toEqual(null)
  })
})
