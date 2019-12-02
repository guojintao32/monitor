const Koa = require('koa');
const app = new Koa();
const static = require('koa-static');

app.use(static('./dist'));
app.listen('8082');