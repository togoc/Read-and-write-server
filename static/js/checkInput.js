//输入判断
function ex1() {
    var username = document.querySelector('.username')
    var paddworld = document.querySelector('.passworld')
    var submit = document.querySelector('.submit')
    var tips = document.querySelectorAll('.ex1 .tips')

    //获取元素属性函数
    function getStyle(elem, str) {
        return (elem.currentStyle) ? (elem.currentStyle[str]) : (getComputedStyle(elem)[str])
    }

    username.oninput = function () {
        var val = this.value
        var reg = /^[a-zA-Z_]\w{5,14}$/;//字母,数字,下划线组成,开头不能是数字,长度6-15之间
        if (reg.test(val)) {
            tips[0].style.opacity = 0
        } else {
            tips[0].style.opacity = 1
        }
    }
    paddworld.oninput = function () {
        var val = this.value
        var reg = /^[a-zA-Z0-9]\w{7,15}$/; //字母,数字组成,长度8-16之间
        if (reg.test(val)) {
            tips[1].style.opacity = 0
        } else {
            tips[1].style.opacity = 1
        }
    }
    submit.addEventListener('click', function () {
        var flat = false
        for (let i = 0; i < tips.length; i++) {
            if (getStyle(tips[i], "opacity") == "1") {
                flat = true
                break
            } else {
                flat = false
            }
        }
        if (flat) {
            location.href = '/home'
        } else {
            return
        }
    })

}




(function main() {
    ex1();




})()