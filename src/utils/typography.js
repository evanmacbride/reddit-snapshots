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
      '500',
      '600',
    ],
  },
  {
    name: 'Source Sans Pro',
    styles: [
      '400',
      '700',
    ]
  }
]

const overrideStyles = ({ adjustFontSizeTo, rhythm }, options, styles) => ({
  a: {
    textDecoration: 'none',
    color: '#d2dae2',
  },
  body: {
    color: '#808e9b',
    backgroundColor: '#1e272e',
  },
  'h1, h2, h3, h4': {
    color: '#d2dae2',
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
    maxWidth: 'none',
    marginBottom: 'none',
    objectFit: 'cover',
  },
  'img, svg': {
    height: '76px',
    width: '101px',
  },
  li: {
    display: 'flex',
    marginBottom: rhythm(0.2),
  },
  'li > div': {
    borderTop: '1px solid #485460',
    display: 'block',
    fontSize: '0.875rem',
    padding: '2px 4px 0 6px',
    width: '100%',
  },
  'li:first-of-type > div': {
    borderTop: 'none',
  },
  '.linkTitle': {
    fontWeight: 700,
    fontSize: '1rem',
  },
  svg: {
    backgroundColor: '#0008',
    fill: '#d2dae2',
  },
  ul: {
    marginLeft: '0',
    paddingLeft: '0',
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
