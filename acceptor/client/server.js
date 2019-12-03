const Koa = require('koa');
const app = new Koa();
const path = require('path');
const fs = require('fs');
const router = require('koa-router')();

router.get('*', async (ctx, next) => {
  if(ctx.req.url === '/') {
    ctx.req.url = 'index.html';
    ctx.type='text/html;charset=utf-8'
  }
  //ctx.req.url = ctx.req.url.replace('/','');
  console.log(path.join(__dirname,'./dist',ctx.req.url))
  ctx.response.body = fs.readFileSync(path.join(__dirname,'./dist',ctx.req.url))
})

app.use(router.routes());
app.listen('8082');