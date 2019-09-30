import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";

export default ({ data }) => {
  console.log(data);
  return (
    <Layout>
      <div>
        <h1>My Site's Files</h1>
        <table>
          <thead>
            <tr>
              <th>relativePath</th>
              <th>name</th>
              <th>size</th>
              <th>changeTime</th>
            </tr>
          </thead>
          <tbody>
            {data.allFile.edges.map(({ node }, index) => (
              <tr key={index}>
                <td>{node.relativePath}</td>
                <td>{node.name}</td>
                <td>{node.size}</td>
                <td>{node.changeTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  )
}
export const query = graphql`
  query {
    allFile {
      edges {
        node {
          relativePath
          name
          size
          changeTime(fromNow: true)
        }
      }
    }
  }
`
