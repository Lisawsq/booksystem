//用来管理数据库
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/BookSystem');
var db=mongoose.connection;
db.on('open',function () {
    console.log('hello mongoose....')
})
db.on('error',function () {
    console.log('Bye mongoose...')
})
//创建集合 
//创建图书类型表

var typeSchema=new mongoose.Schema({
    type:String,
    hot:Number,
},{versionKey:false})//去掉版本号
var Typebook=mongoose.model('Typebook',typeSchema);

//创建一个图书信息表
var bookSchema=new mongoose.Schema({
    bookname:String,
    price:Number,
    author:String,
    typeInfo:{type:mongoose.Schema.Types.ObjectId,ref:'Typebook'}
})
var Book=mongoose.model('Book',bookSchema);
module.exports={Typebook,Book};