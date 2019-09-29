const fs = require('fs')


let GetDir = {
    index: null,
    home: null,
    /**
     * 返回对象{ index:当前所在目录,fileDir:目录下内容,homeDir:服务器主目录}
     * @param {string} str 请求的目录
     * @param {string} prev 是否后退,默认false
     */
    getHomeDir: function (str, prev = false) {
        this.index = str
        if (this.home == null) {
            this.home = str
        }
        if (prev) {
            this.index = str.slice(0, str.lastIndexOf("/"))
        }
        let data = {
            files: fs.readdirSync(this.index),
            index: this.index,
            home: this.home
        }
        return data
    },

}







module.exports = GetDir