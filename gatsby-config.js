module.exports = {
  siteMetadata: {
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/documentation`,
        name: `documentation`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`
    },
  ],
};
