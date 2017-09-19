const path = require('path')

const devtool = process.env.NODE_ENV === 'develop' ? 'eval-source-map' : undefined

module.exports = {
    entry: './src/index.js',
    devtool,
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.jsx?/, loader: 'babel-loader'},
            { test: /\.css$/, loader: 'css-loader'}
        ]
    },
    devServer: {
        host: '0.0.0.0',
        disableHostCheck: true,
        historyApiFallback: {
            index: 'index.html'
        },
        proxy: {
            '/api': {
                target: 'http://gateway:4000',
                secure: false
            }
        },
        contentBase: path.join(__dirname, 'public')
    }
}