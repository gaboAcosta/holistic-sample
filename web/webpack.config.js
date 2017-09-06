const path = require('path')

module.exports = {
    entry: './src/index.js',
    devtool: 'eval-source-map',
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
        proxy: {
            '/api': {
                target: 'http://gateway:4000',
                secure: false
            }
        }
    }
}