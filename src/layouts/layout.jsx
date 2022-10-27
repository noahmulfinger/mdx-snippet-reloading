import * as React from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";

const Layout = ({ data }) => {
  const mdx = data.mdx;

  return (
    <main>
      <header>
        <h1>{mdx.frontmatter.title}</h1>
      </header>
      <MDXRenderer>{mdx.body}</MDXRenderer>
    </main>
  );
};

export default Layout;

export const query = graphql`
  query LayoutQuery($id: String!) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
      }
    }
  }
`;
