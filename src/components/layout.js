import React from "react"
import { css } from "@emotion/core"
import { useStaticQuery, Link, graphql } from "gatsby"
import { rhythm } from "../utils/typography"
import Footer from "../components/footer"

export default ({ children }) => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )
  return (
    <div>
      <div
        css={css`
          margin: 0 auto;
          max-width: 610px;
          padding-top: ${rhythm(0.5)};

        `}
      >
        <nav
          css={css`
            background-color: #000000bd;
            display: flex;
            flex-flow: row wrap;
            justify-content: space-between;
            margin-bottom: 2.5rem;
            padding: 8px 5px;
          `}
        >
          <Link to={`/`}>
            <h3
              css={css`
                color: #00d8d6;
                margin-bottom: 0;
              `}
            >
              {data.site.siteMetadata.title}
            </h3>
          </Link>
          <span
            css={css`
              display: flex;
              flex-flow: row wrap;
            `}
          >
          <Link to={`/archive`}
            css={css`
                margin-right: 0.58em;
            `}
          >
            <h3
              css={css`
                color: #d2dae2a8;
                margin-bottom: 0;
              `}
            >
              Archive
            </h3>
          </Link>
            <Link to={`/about`}>
              <h3
                css={css`
                  color: #d2dae2a8;
                  margin-bottom: 0;
                `}
              >
                About
              </h3>
            </Link>

          </span>
        </nav>
        {children}
      </div>
      <Footer>
      </Footer>
    </div>
    )
}
