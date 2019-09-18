const express = require('express')
const fs = require('fs')
const app = express()
const multer = require('multer')

// 在Express 中 没有内置获取表单POST请求体的API，这里我们需要使用一个第三方的包 ：body-parser
//req.body 识别
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({ extende: true }));
app.use(bodyparser.json())

//处理"multipart/form-data"类型文件(post上传的)
app.use(multer({ dest: './dist' }).array('name'));  //此处的array('file')对应html部分的name


app.use('/', express.static(__dirname))


app.get('/home', function (req, res) {

    var options = {
        root: __dirname,
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };

    var fileName = '/static/home.html';
    // 发送文件
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Sent:', fileName);
        }
    });
})


var index, t
app.get('/read', function (req, res) {
    if (req.query.prev) {
        console.log(req.query.prev)
        if (index.indexOf('/') != -1) {
            index = index.slice(0, index.lastIndexOf('/'))
        } else {
            index = 'd:\\'
        }
        t = (fs.readdirSync(index))
    } else if (req.query.code) {
        if (index == 'd:\\') {
            index += req.query.code.split('/')[1]
        } else {
            index += req.query.code
        }
        t = (fs.readdirSync(index))
    } else if (req.query.back) {
        console.log(req.query.back)
        index = req.query.back
        t = (fs.readdirSync(index))
    }
    res.send({
        files: t,
        index
    })
})

app.post('/formdata', function (req, res) {
    console.log(req.query)

    var dir_file
    // console.log(req.files[0].path);//保存的名字
    // console.log(req.files[0].originalname);//原来文件的名字

    if (req.files[0]) {
        fs.readFile(req.files[0].path, function (err, data) {
            if (err) {
                res.send({ err })
            } else {
                if (req.query.index) {
                    dir_file = req.query.index + '/' + req.files[0].originalname
                } else {
                    dir_file = __dirname + 'dist/' + req.files[0].originalname
                }

                fs.writeFile(dir_file, data, function (err) {
                    var obj = {
                        msg: 'upload success',
                        filename: req.files[0].originalname
                    }
                    res.send(obj);
                })
            }
        })
    } else {
        res.send('请添加文件')
    }


})

app.get('/homepage', function (req, res) {
    index = __dirname;
    var data = {
        files: fs.readdirSync(__dirname),
        index
    }
    res.send(data)//同步
})

app.listen('8080', function () {
    console.log(' running now ! (this is a readfiles system !)')
})
