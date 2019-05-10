'use strict'

const path = require('path');
const webpack = require('webpack'); // chtobi zapuskat' plugini
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');

// const webpack = require('webpack'); // esli naprimer hotim process.env. variables byli vidni v entry files (dovaim plugins:)
// no poxodu eto uze i bez stroki vishe rabotaet, poetomu zakommentim
// xotia NODE_ENV v index.js rabotaet i bez etogo no drugie variables peredat ne udalos

const distPath = path.join(__dirname, '/public');
//const IS_DEV = NODE_ENV == 'development';

module.exports = (env, argv) => ({ // inache --mode nikak ne vitjanut'
//module.exports = {
  // if [custom] | [default] -> output
  //entry: './src/js/index.js',

  // if [manyjs] .js (bundle(vendor) & game.js+hello module)
  
  // context: __dirname+'/src/js', // otnositelno kakoj dir delat poisk, togda mozno: 'game': './game.js'
  
  entry: {
    bundle: './src/js/index.js',
    game: './src/js/game.js',
    chat: './src/js/chat.js',
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

    // windows regexp dlya momentjs(ru|en) locale prichem eto dlya dev sborki, dlya prod i bez nee norm, viberet tolko to chto nuzno.
    new webpack.ContextReplacementPlugin(
      /moment[/\\]locale$/, 
      /en-gb|ru/
    ),
    // ContextReplacementPlugin - white list
    //             IgnorePlugin - black list (lutse white list uzat')

    // jquery
    // izbovlaemsa ot window.$ = window.jQuery = $; v index.js
    // no v takom sluchae jquery budet 2 raza v bilde v index.js i game.js
    // esli ostavit window.$ = ..., to tolko v index.js a game.js vseravno ego ponimaet (eto sejcas menja ustraivaet)
    //new webpack.ProvidePlugin({
    //  $: 'jquery',
    //  jQuery: 'jquery'
    //}),

    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css'
      //filename: devMode ? '[name].css' : '[name].[contenthash].css',
      //chunkFilename: devMode ? '[id].css' : '[id].[contenthash].css',
    }),
  ],

  optimization: {
    // css minification, (!) esli ne podkljuchit' TerserJsPlugin to posle build budet warning o minifilacii css
    // pri etom Terser stavitsa vmeste OptimizeCss..
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },

  module: {
    rules: [ // pravila dlya .js .scss etc.
      {
        test: /\.js$/,
        
        //exclude: /node_modules/,
        exclude: /(node_modules|public)/, // kuda ne zaxodim v poiski js
        include: path.resolve(__dirname, 'src/js'), // (!) absolute path

        use: {
          loader: 'babel-loader',
          options: { // mozno vinesti v .babelrc?
            presets: ['@babel/preset-env'], // chet 'env' bolse ne rabotaet
          }
        }
      },
      {
        //test: /\.s?[ac]ss$/, // css or sass
        test: /\.(css|sass|scss)$/,
        exclude: /(node_modules|public)/, // kuda ne zaxodim v poiski js
        include: path.resolve(__dirname, 'src/style'),

        use: [
          // style-loader ne sozdaet bundli css on prosto virtualno pogruzaet css pri dev
          // esli vozniknut pri dev problemi to prosto ostavim stroku MiniCssExtractPlugin.loader,
          // dlya extracta css v public folder
          argv.mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          // esli bozniknut problem
          { loader: 'css-loader' },
          { 
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        
        // ne znaju na skolko eto zdes umestno
        //exclude: /(node_modules|public)/, // a esli images plagina berutsa iz node modules?
        //include: path.resolve(__dirname, 'src/images'),
        exclude: /(public)/, // nu ostavim tak.
        
        use: [
          {
            // (!) puti v css dolzni nachitsa s ../path a-ne s /path
            loader: 'file-loader',
            options: {
              name(file) {
                if (argv.mode === 'development') {
                  return 'images/[name].[ext]'; // dlya dev sohranim v public/images s realnim imenem
                }

                return '[hash].[ext]'; // dlya prod zaxeshiruem
                // (!) imya daetsa po hash sum iskljucheni duplikacii pri mnogokratnom build
                // a mozno i tak [name].[ext]?[hash]
              },
            },
          },
        ],
      },

      {
        // dlya fontov po analogii s images
        test: /\.(eot|svg|ttf|woff|woff2)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name(file) {
              if (argv.mode === 'development') {
                return 'fonts/[name][hash].[ext]';
              }

              return '[name][hash].[ext]';
            },
          }
        },
      },
    ],
  }
});