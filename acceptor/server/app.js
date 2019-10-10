//import testModel from './mongodb/model';
const testModel = require('./mongodb/model')
const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const koaBody = require('koa-bodyparser');
app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (ctx.method == 'OPTIONS') {
        ctx.body = 200;
    } else {
        await next();
    }
});
app.use(koaBody());
router.get('/', async (ctx, next) => {
    ctx.response.body = '<h1>Index</h1>';
});
router.get('/testadd', async (ctx, next) => {
    testModel.add({ name:'1232312' });
    ctx.response.body = '<h1>testadd</h1>';
});
router.get('/testfind', async (ctx, next) => {
    const res = await testModel.find();
    ctx.response.body = '<h1>testfind</h1>';
});
router.post('/report', async (ctx, next) => {
    var type = ctx.request.body.type || '';
    ctx.response.body = `<h1>${type}</h1>`;
})
app.use(router.routes());

module.exports = app;
