module.exports = {
    devServer: {
        proxy: {
            '/open-api': {
                target: 'https://www.travel.taipei',
                changeOrigin: true,
                pathRewrite: {
                    '^/open-api': '',
                },
            },
        },
    },
};
  