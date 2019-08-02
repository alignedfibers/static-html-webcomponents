var path = require('path');

module.exports = {
  //...
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    compress: false,
    port: 9000
  }
};