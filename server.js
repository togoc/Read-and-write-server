const GetDir = require("./components/getDir")
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

    var fileName = 'index.html';
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
    // console.log(index)
    if (req.query.prev) {
        res.send(GetDir.getHomeDir(req.query.prev, prev = true))
        return
    } else if (req.query.code) {
        res.send(GetDir.getHomeDir(req.query.code))
        return
    } else if (req.query.back) {
        console.log(req.query.back)
        index = req.query.back
        t = (fs.readdirSync(index))
    }
    // res.send({
    //     files: t,
    //     index,
    //     home: __dirname
    // })
})

// console.log(fs.readdirSync(__dirname+"/"))

app.post('/formdata', function (req, res) {
    console.log(req.query)

    // console.log(req.files[0].path);//保存的名字
    // console.log(req.files[0].originalname);//原来文件的名字
    // console.log(req.files[0].filename)

    // fs.rename()

    if (req.files[0]) {
        fs.readFile(req.files[0].path, function (err, data) {
            if (err) {
                res.send({ err })
            } else {
                if (req.query.index) {
                    if (GetDir.checkDir(req.files[0].originalname)) {
                        fs.renameSync(req.query.index + '/' + req.files[0].originalname, req.query.index + '/' + req.files[0].originalname + "--" + `${new Date().getTime()}`)
                        console.log("文件已存在!")
                    }
                    console.log(GetDir.checkDir(req.files[0].originalname));
                    fs.renameSync(__dirname + '/dist/' + req.files[0].filename, req.query.index + '/' + req.files[0].originalname)
                    res.send({ msg: 'upload success' });
                    return
                } else {
                    if (GetDir.checkDir(req.files[0].originalname)) {
                        fs.renameSync(__dirname + '/dist/' + req.files[0].originalname, __dirname + '/dist/' + req.files[0].originalname + "--" + `${new Date().getTime()}`)
                        console.log("文件已存在!")
                    }
                    fs.renameSync(__dirname + '/dist/' + req.files[0].filename, __dirname + '/dist/' + req.files[0].originalname)
                    res.send({ msg: 'upload success' });
                    return
                }
            }
        })
    } else {
        res.send('请添加文件')
    }


})

app.get('/homepage', function (req, res) {
    index = __dirname;
    res.send(GetDir.getHomeDir(index))//同步
})

app.get("/mkdir", (req, res) => {
    fs.mkdir(req.query.index + "/" + req.query.dirName, function (err) {
        if (err) {
            res.send("目录已经存在")
            return console.error(err);
        }
        console.log("test2目录创建成功。");
        res.send(GetDir.getHomeDir("", index = true))
    });

})


app.listen('8181', function () {
    console.log(' running now ! (this is a readfiles system !)')
})