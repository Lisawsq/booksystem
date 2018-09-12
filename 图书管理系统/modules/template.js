//识别模板后缀名.html的文件
var template = require('art-template');
var app = require('./app')

app.engine('.html', require('express-art-template'));
app.set('view engine', 'html');

app.set('views', './views');
template.defaults.extname = '.html';

module.exports = template;
