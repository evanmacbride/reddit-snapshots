import Typography from "typography"
import kirkhamTheme from "typography-theme-kirkham"

/*const googleFonts = [
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
]*/

const googleFonts = [
  {
    name: 'Work Sans',
    styles: [
      '400',
      '600',
    ],
  },
  {
    name: 'Source Sans Pro',
    styles: [
      '400',
    ]
  }
]

const overrideStyles = ({ adjustFontSizeTo, rhythm }, options, styles) => ({
  a: {
    textDecoration: 'none',
    color: '#d2dae2',
  },
  article: {
    display: 'flex',
    marginBottom: rhythm(1),
  },
  'article p': {
    marginBottom: '0',
  },
  body: {
    color: '#808e9b',
    backgroundColor: '#1e272e',
  },
  'h1, h2, h3, h4': {
    color: '#ffc048',
    textTransform: 'uppercase',
  },
  '.divider': {
    color: '#d2dae2',
  },
  h1: {
    fontWeight: '600',
    letterSpacing: '0.07rem',
  },
  'h2, h3, h4': {
    fontSize: '1rem',
    letterSpacing: '0.015rem',
  },
  img: {
    height: '64px',
    maxWidth: 'none',
    marginBottom: 'none',
    objectFit: 'cover',
    paddingRight: '4px',
    width: '104px',
  },
  svg: {
    backgroundColor: 'black',
    fill: '#d2dae2',
    marginRight: '4px',
    width: '104px'
  }
})

kirkhamTheme.baseFontSize = "16px"
kirkhamTheme.baseLineHeight = 1.25
kirkhamTheme.bodyFontFamily = ["Source Sans Pro","sans-serif"]
kirkhamTheme.googleFonts = googleFonts
kirkhamTheme.headerFontFamily = ["Work Sans","sans-serif"]
kirkhamTheme.headerWeight = "normal"
kirkhamTheme.overrideStyles = overrideStyles
kirkhamTheme.scaleRatio = 2

const typography = new Typography(kirkhamTheme)
console.log(typography)

export default typography
export const rhythm = typography.rhythm
