const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

function isSnippet(node) {
  return node.fileAbsolutePath.split("/").slice(-1)[0].startsWith("_");
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(
    `
      {
        allMdx {
          nodes {
            id
            fileAbsolutePath
            fields {
              slug
            }
          }
        }
      }
    `
  );

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your pages`,
      result.errors
    );
    return;
  }

  const nodes = result.data.allMdx.nodes;

  if (nodes.length > 0) {
    nodes
      .filter((node) => !isSnippet(node))
      .forEach((node) => {
        createPage({
          path: "/documentation" + node.fields.slug,
          component: path.resolve(`./src/layouts/layout.jsx`),
          context: {
            id: node.id,
          },
        });
      });
  }
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `Mdx` && !isSnippet(node)) {
    const value = createFilePath({ node, getNode });

    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
