'use strict'

const path = require('path');

const distPath = path.join(__dirname, '/public'); // output path (or: path.resolve(__dirname, 'public'))

module.exports = {
  entry: './src/index.js',
  output: {
    // default
    // filename: './bundle.js', // output dist/bundle.js (webpack dist folder sam sozdast)

    // custom
    path: distPath,
    filename: 'bundle.js'
  },

  devServer: { // ili default: http://localhost:8080
    contentBase: distPath, // t.k. index file u nas v public/index.html, nuzna opcija devServer
    port: 9000,
    //compress: true,
    //inline: true,
    //hot: true,
    
    open: true // open browser
  }
};