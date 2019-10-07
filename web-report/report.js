const repUrl = 'http://localhost:8081/report';
(function(global){
    //js报错
    global.onerror = function (msg, url, row, col, error) {
        console.log('onerror 我知道错误了');
        console.log({
            msg,  url,  row, col, error
        })
        return true;
    };
    //promise报错
    global.addEventListener("unhandledrejection", function(e){
        e.preventDefault()
        request(repUrl,{body:JSON.stringify({
            ...defaultParam(),
            form:'unhandledrejection',
            type:'promise',
            reason:typeof e.reason === 'object' ? e.reason.message : e.reason,
        })})
        return true;
    });
    //资源异常监听
    global.addEventListener('error', (msg) => {
        if(msg.target.nodeName === "SCRIPT"){
            console.log('add error')
            return true;
        }
    }, true);
})(window)


function request (url,option){
    option.method = option.method || 'POST';
    option.headers = new Headers({
        'content-type':'application/json'
    })
    return fetch(url,option).then(response=>{
        return response.text();
    })
}
function defaultParam (){
    return {
        time:new Date().getTime(),
        href:window.location.href
    }
}