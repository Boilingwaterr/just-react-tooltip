module.exports = {
    port: process.env.PORT || 3000,
    base: '/docz',
    dest: "/docz/documentation",
    plugins: [
        `gatsby-alias-imports`,
        `gatsby-plugin-root-import`,
    ]
}