'use strict'

const path = require('path');
// const webpack = require('webpack'); // esli naprimer hotim process.env. variables byli vidni v entry files (dovaim plugins:)
// no poxodu eto uze i bez stroki vishe rabotaet, poetomu zakommentim
// xotia NODE_ENV v index.js rabotaet i bez etogo no drugie variables peredat ne udalos

const distPath = path.join(__dirname, '/public'); // output path (or: path.resolve(__dirname, 'public'))
const NODE_ENV = process.env.NODE_ENV || 'development';


module.exports = {
  // if [custom] | [default] -> output
  //entry: './src/index.js',

  // if [manyjs] .js (bundle(vendor) & game.js+hello module)
  entry: {
    'bundle': './src/index.js',
    'game': './src/js/game.js',
  },
  
  output: {
    // [default]
    // filename: './bundle.js', // output dist/bundle.js (webpack dist folder sam sozdast)

    // [custom]
    //path: distPath,
    //filename: 'bundle.js'

    // [manyjs]
    path: distPath,
    filename: '[name].js',
  },

  devServer: { // ili default: http://localhost:8080
    contentBase: distPath, // t.k. index file u nas v public/index.html, nuzna opcija devServer
    port: 9000,
    //compress: true,
    //inline: true,
    //hot: true,
    
    open: true // open browser
  },

  watchOptions: {
    aggregateTimeout: 100, // uskorim sborku, zadaet timeout na sborku webpack (t.k. ne vse fajli IDE uspel sohranit)
  },

  // voobwe v webpack-dev-server 'eval' by default
  //'devtool': NODE_ENV == 'development' ? 'eval' : null, // uncomment if dev-server not webpack-dev

  plugins: [
    //new webpack.EnvironmentPlugin('PORT') // hotim process.env. variables byli vidni v entry files
    // no poxodu eto uze i bez stroki vishe rabotaet, poetomu zakommentim
    // xotia NODE_ENV v index.js rabotaet i bez etogo no drugie variables peredat ne udalos
  ]
};