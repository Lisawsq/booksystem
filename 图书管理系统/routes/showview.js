//用来显示管理系统中的所有界面
var express = require('express');
var router = express.Router();
var template = require('../modules/template');
var db = require('../modules/mongoose')
var Typebook = db.Typebook;
var Book = db.Book;
//显示添加书籍类别的接口
router.get('/addtype', function (req, res) {
    res.render('addtype');
})
//显示添加书籍的接口
router.get('/addbook', function (req, res) {
    Typebook.find(function (err, data) {
        if (!err) {
            res.render('addbook', {data})
        }
    })
})
//显示图书详情页面
router.get('/showbooks', function (req, res) {
    // res.render('showbooks')
    Book.find(req.query,function (err, data) {
        if (!err) {
            // console.log(data)
            res.render('showbooks', {data})
        }
    }).populate('typeInfo')//关联搜索
})
module.exports = router;