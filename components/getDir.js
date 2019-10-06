const fs = require('fs')


let GetDir = {
    index: null,
    home: null,
    index_dir: [],
    /**
     * 返回对象{ index:当前所在目录,fileDir:目录下内容,homeDir:服务器主目录}
     * @param {string} str 请求的目录
     * @param {string} prev 是否后退,默认false
     */
    getHomeDir: function (str, prev = false, index = false) {
        // console.log(str, prev, index)
        if (this.home == null) {
            this.home = str
        }
        if (prev) {
            if (str != this.home)
                str = str.slice(0, str.lastIndexOf("/"))
        }
        if (!index && str != "") {
            this.index = str
        }
        this.index_dir = fs.readdirSync(this.index)
        let data = {
            files: this.index_dir,
            index: this.index,
            home: this.home
        }
        return data
    },
    checkDir: function (str) {
        console.log(this.index_dir)
        if (this.index_dir.some((x) => x == str)) {
            return true
        } else {
            return false
        }
    }

}

module.exports = GetDir