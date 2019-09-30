import React from "react"
import { graphql } from "gatsby";
import Layout from "../components/layout"

export default ({ data }) => (
  <Layout>
    <h1>About {data.site.siteMetadata.title}</h1>
    <p>
      A curated list of top Reddit posts, compiled by u/evnbd.
    </p>
  </Layout>
)
export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
