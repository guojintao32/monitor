(function (global) {
    const repUrl = 'http://localhost:8088/report';
    document.HTMLDOMtoString = function (HTMLDOM) {
        const div = document.createElement("div")
        div.appendChild(HTMLDOM)
        return div.innerHTML
    }
    //js报错
    global.onerror = function (msg, url, row, col, error) {
        console.log('onerror 我知道错误了');
        this.request(repUrl,{
            body:JSON.stringify({
                ...this.defaultParam(),
                from:'onerror',
                type:'scriptError',
                fileName:url,
                row,col,
                reason:msg
            })
        })
        return true;
    };
    //promise报错
    global.addEventListener("unhandledrejection", function (e) {
        e.preventDefault()
        request(repUrl, {
            body: JSON.stringify({
                ...defaultParam(),
                from: 'unhandledrejection',
                type: 'scriptError',//'promise',
                reason: typeof e.reason === 'object' ? e.reason.message : e.reason,
            })
        })
        return true;
    });
    //资源异常监听
    global.addEventListener('error', (msg) => {
        if (!(msg instanceof ErrorEvent)) {//这里只处理资源异常
            request(repUrl, {
                body: JSON.stringify({
                    ...defaultParam(),
                    from: 'error',
                    type:'reasourceError',
                    node:msg.target.nodeName,
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
    // return fetch(url, option).then(response => {
    //     return response.text();
    // }).catch(e => {
    //     console.log(e)
    // })
}
function defaultParam() {
    return {
        time: new Date().getTime(),
        href: window.location.href
    }
}
//性能监控
let times = {};
let t = window.performance.timing;
window.onload = function () {
  if (typeof window.PerformanceNavigationTiming === 'function') {
    try {
      var nt2Timing = performance.getEntriesByType('navigation')[0]
      if (nt2Timing) {
        t = nt2Timing
      }
    } catch (err) {
      console.log(err)
    }
  }
  //重定向时间
  times.redirectTime = t.redirectEnd - t.redirectStart;

  //dns 查询耗时
  times.dnsTime = t.domainLookupEnd - t.domainLookupStart;

  //TTFB 读取页面第一个字节的时间
  times.ttfbTime = t.responseStart - t.fetchStart;

  //DNS 缓存时间
  times.appcacheTime = t.domainLookupStart - t.fetchStart;

  //卸载页面的时间
  times.unloadTime = t.unloadEventEnd - t.unloadEventStart;

  //tcp 连接耗时
  times.tcpTime = t.connectEnd - t.connectStart;

  //request 请求耗时(html下载耗时))
  times.reqTime = t.responseEnd - t.responseStart;

  //解析 dom 树耗时
  times.analysisTime = t.domComplete - t.domInteractive;

  //白屏时间 
  times.blankTime = (t.domInteractive || t.domLoading) - t.fetchStart;

  //domReadyTime
  times.domReadyTime = t.domContentLoadedEventEnd - t.fetchStart;

  if (typeof window.performance.getEntries === 'function') {
    let p = window.performance.getEntries();
    let jsR = p.filter(ele => ele.initiatorType === "script");
    //JS 总加载耗时
    times.jsTime = Math.max(...jsR.map((ele) => ele.responseEnd)) - Math.min(...jsR.map((ele) => ele.startTime));
    let cssR = p.filter(ele => ele.initiatorType === "css" || ele.initiatorType === "link");
    //CSS 总加载耗时
    times.cssTime = Math.max(...cssR.map((ele) => ele.responseEnd)) - Math.min(...cssR.map((ele) => ele.startTime));

    
  }
  if (!localStorage.performanceTime || new Date().getTime() - localStorage.performanceTime > 1000 * 60 * 60 * 6) {
    request(performanceUrl, { body: JSON.stringify(times) });
    localStorage.performanceTime = new Date().getTime();
  }
  console.table(times)
}
// request(repUrl, {
//     body: JSON.stringify({
//       ...defaultParam(),
//       from: 'http',
//       type: 'httpError',
//       url,
//       status,
//       reason: codeMessage[status],
//     })
//   })