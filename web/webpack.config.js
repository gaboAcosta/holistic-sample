module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            { test: /\.jsx?/, loader: 'babel-loader'},
            { test: /\.css$/, loader: 'css-loader'}
        ]
    },
    devServer: {
        host: '0.0.0.0',
        proxy: {
            '/api': {
                target: 'http://gateway:4000',
                secure: false
            }
        }
    }
}