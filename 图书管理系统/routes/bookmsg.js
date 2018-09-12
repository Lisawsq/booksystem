//此路由只处理对于书本信息的操作
var express = require('express');
var router = express.Router();
//导入数据库
var db = require('../modules/mongoose');
var Typebook = db.Typebook;
var Book = db.Book;
var template = require('../modules/template');
router.get('/addtype', function (req, res) {
    console.log(req.query)
    //保存图书类别
    //要先判断，当前保存的类别是否已经存在
    Typebook.find({
        type: req.query.type
    }, function (err, data) {
        if (data.length > 0) {
            res.send('当前类别已存在，可直接添加书籍')
        } else {
            //保存
            Typebook(req.query).save(function (err) {
                if (!err) {
                    res.redirect('/')
                } else {
                    console.log(err);
                }
            })
        }
    })

})
//添加书籍信息
router.get('/addbook', function (req, res) {
    Book(req.query).save(function (err) {
        if (!err) {
            res.redirect('/');
        }
    })
})
//删除图书信息
router.get('/remove', function (req, res) {
    //1、要么此处{_id:req.query.id}
    //2、要么在showbooks.html页面id前面加上_如：/book/remove?_id={{book.id}}
    Book.remove({
        _id: req.query.id
    }, function (err, result) {
        if (!err) {
            res.redirect('/showbooks');
        }
    })
})
//点击作者显示对应的书籍
// router.get('/author',function (req,res) {
//     Book.find(req.query,function (err,data) {
//         if (!err) {
//             res.render('showbooks',{data})
//         }
//     }).populate('typeInfo');
// })

//关于书本搜索
router.get('/search', function (req, res) {
    // console.log(req.query)
    var arr = {};
    if (Number(req.query.search)) {
        //是数字，按热度搜索
        arr.hot = req.query.search;
        var idarr = [];
        Typebook.find(arr, function (err, data) {
            // console.log(data)
            data.forEach(function (item) {
                var str = {
                    typeInfo: item._id
                };
                idarr.push(str);
            })
            console.log(idarr)
            //  $or:[条件1，条件2,...]
            Book.find({
                $or: idarr
            }, function (err, data) {
                // console.log(data);
                if (!err) {
                    if (data.length > 0) {
                        res.render('showbooks', {
                            data
                        });
                    } else {
                        res.send('还没有该热度的书籍！')
                    }
                }
            }).populate('typeInfo');
        })
    } else {
        //不是数字，按书名搜索
        arr.bookname = {
            $regex: req.query.search
        };
        Book.find(arr, function (err, data) {
            if (!err) {
                res.render('showbooks', {
                    data
                })
            }
        }).populate('typeInfo');
    }

})
module.exports = router;