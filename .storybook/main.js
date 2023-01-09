module.exports = {
    "stories": ["../stories/**/*.stories.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],
    "addons": ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions"],
    "framework": "@storybook/html",
    core: {
        builder: "webpack5"
    },
    staticDirs: [
        {
            from: "../www/css",
            to: "/css"
        },
        {
            from: "../www/images",
            to: "/images"
        },
        {
            from: "../www/js",
            to: "/js"
        }
    ],
    logLevel: "debug"
};