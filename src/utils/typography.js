import Typography from "typography"
import kirkhamTheme from "typography-theme-kirkham"

const googleFonts = [
  {
    name: 'Montserrat',
    styles: [
      '200',
      '400',
    ],
  },
  {
    name: 'Fira Sans',
    styles: [
      '400',
      '400i',
      '700',
      '700i',
    ],
  },
]

const overrideStyles = ({ adjustFontSizeTo, rhythm }, options, styles) => ({
  a: {
    textDecoration: 'none',
    color: '#9f392b'
  },
  article: {
    display: 'flex',
    marginBottom: rhythm(1)
  },
  'article p': {
    marginBottom: '0',
  },
  'h1, h2, h3, h4': {
    letterSpacing: '0.04rem',
    textTransform: 'uppercase'
  },
  h1: {
    fontWeight: '200'
  },
  'h2, h3, h4': {
    fontSize: '1rem'
  },
  img: {
    height: '4rem',
    maxWidth: '120px',
    objectFit: 'cover',
    marginBottom: 'none',
    paddingRight: '4px',
    width: '6.47rem',
  }
})

kirkhamTheme.baseFontSize = "16px"
kirkhamTheme.baseLineHeight = 1.25
kirkhamTheme.googleFonts = googleFonts
kirkhamTheme.headerFontFamily = ["Montserrat","sans-serif"]
kirkhamTheme.headerWeight = "normal"
kirkhamTheme.overrideStyles = overrideStyles
kirkhamTheme.scaleRatio = 2

const typography = new Typography(kirkhamTheme)
console.log(typography)

export default typography
export const rhythm = typography.rhythm
