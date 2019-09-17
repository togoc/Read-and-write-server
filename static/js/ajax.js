function ajax(url) {
    $.ajax({
        type: 'get',
        url: url,
        dataType: 'jsonp',
        jsonp: 'cb',
        data: {
            wd: 'json'
        }
    }).done(function (res) {
        console.log(res)
    })

}