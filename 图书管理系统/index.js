//导入app
var app=require('./modules/app');


//使用showview路由显示页面
app.use(require('./routes/showview'));
//使用bookmsg的路由
app.use('/book',require('./routes/bookmsg'));
app.listen(3000,function () {
    console.log('图书管理系统....');
})