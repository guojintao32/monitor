const Koa = require('koa');
const app = new Koa();
const path = require('path');
const fs = require('fs');
const router = require('koa-router')();
const proxy = require('koa2-proxy-middleware');

function getFile(path){
  return new Promise((res,rej)=>{
    fs.readFile(path,(err,data)=>{
        if(err)rej(err)
        else res(data)
    })
  })
}

router.get('*', async (ctx, next) => {
  if(ctx.req.headers.accept.indexOf('text/html')>=0) {
    ctx.req.url = 'index.html';
    ctx.type='text/html;charset=utf-8'
  }
  if(ctx.req.url.indexOf('api')<=0){
    ctx.response.body = await getFile(path.join(__dirname,'./dist',ctx.req.url));
  }
  else{
    next();
  }
})

app.use(router.routes());
app.use(proxy({
  targets:{
    '/api/(.*)': {
      target: 'http://[::1]:8081',
      changeOrigin: true,
      pathRewrite: {
        '/api': '', // rewrite path
      }
    }
  }
}));
app.listen('8082');