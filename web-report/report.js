(function (global) {
    const repUrl = 'http://localhost:8081/report';
    document.HTMLDOMtoString = function (HTMLDOM) {
        const div = document.createElement("div")
        div.appendChild(HTMLDOM)
        return div.innerHTML
    }
    //js报错
    global.onerror = function (msg, url, row, col, error) {
        console.log('onerror 我知道错误了');
        console.log({
            msg, url, row, col, error
        })
        return true;
    };
    //promise报错
    global.addEventListener("unhandledrejection", function (e) {
        e.preventDefault()
        request(repUrl, {
            body: JSON.stringify({
                ...defaultParam(),
                form: 'unhandledrejection',
                type: 'promise',
                reason: typeof e.reason === 'object' ? e.reason.message : e.reason,
            })
        })
        return true;
    });
    //资源异常监听
    global.addEventListener('error', (msg) => {
        if (msg.target.nodeName) {//这里只处理资源异常
            request(repUrl, {
                body: JSON.stringify({
                    ...defaultParam(),
                    form: 'error',
                    type: msg.target.nodeName,
                    reason:document.HTMLDOMtoString(msg.target),
                })
            })
        }
    }, true);
})(window)


function request(url, option) {
    option.method = option.method || 'POST';
    option.headers = new Headers({
        'content-type': 'application/json'
    })
    return fetch(url, option).then(response => {
        return response.text();
    }).catch(e => {
        console.log(e)
    })
}
function defaultParam() {
    return {
        time: new Date().getTime(),
        href: window.location.href
    }
}