export function formatNumberSpace(number: number, fix = 0) {
  return new Intl.NumberFormat('uz-UZ', {
    minimumFractionDigits: fix,
  })
    .format(number)
    .replace(/,/g, ' ')
}
export function richTextPurify(str: string, count = 120) {
  const text = str?.replace(/<\/?[^>]+(>|$)|&[^\s]*;/gi, '')
  if (count === 0) {
    return text
  }
  return text?.substring(0, count)
}

export const moneyMask = {
  mask: [
    'D',
    '##',
    '###',
    '# ###',
    '## ###',
    '### ###',
    '# ### ###',
    '## ### ###',
    '### ### ###',
    '# ### ### ###',
  ],
  tokens: {
    D: {
      pattern: /[1-9]/,
    },
  },
}

export function formatDate(dateString: string): string {
  // Remove everything after GMT offset (e.g., "GMT+0500 (Uzbekistan Standard Time)" -> "GMT+0500")
  if (dateString.length && dateString.includes('GMT')) {
    const cleanedDateString = dateString?.replace(/\s\(.+\)$/, '')
    const date = new Date(cleanedDateString)

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      throw new TypeError('Invalid date format')
    }

    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0') // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0')

    return `${year}-${month}-${day}`
  }
}
