//import testModel from './mongodb/model';
const testModel = require('./mongodb/model');
const incorrectModal = require('./mongodb/incorrect.model');
const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const koaBody = require('koa-bodyparser');
const IndexPage = require('./page/index');
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
    ctx.response.body = '连接后台成功~！';
});
router.get('/testadd', async (ctx, next) => {
    let name = '123123123'
    if(ctx.querystring){
        name = ctx.querystring.split('name=')[1];
    }
    testModel.add({ name});
    ctx.response.body = '<h1>testadd</h1>';
});
router.get('/testfind', async (ctx, next) => {
    const res = await testModel.find();
    ctx.response.body = '<h1>testfind</h1>';
});
//从数据库获取所有错误列表
router.get('/incorrect/list',async(ctx)=>{
    const res = await incorrectModal.find(ctx.query);
    ctx.response.body = res;
})
//从数据库获取数量
const moment = require('moment');
router.get('/getCount/chart',async(ctx)=>{
    const res = await incorrectModal.find({'form':'unhandledrejection'});
    const type = ctx.request.query.type || '';
    let dateCount = {};
    for(let item of res){
        let dateKey = moment(item.time).format('YYYY-MM-DD');
        if(!dateCount[dateKey]){
            dateCount[dateKey] = 1;
        }
        else{
            dateCount[dateKey]++;
        }
    }
    ctx.response.body = dateCount;
})
//删除错误
router.get('/remove', async (ctx, next) => {
    const res = await testModel.remove();
    ctx.response.body = '<h1>remove</h1>';
});
//提交错误
router.post('/report', async (ctx, next) => {
    var type = ctx.request.body.type || '';
    const res = await incorrectModal.add(ctx.request.body)
    ctx.response.body = `提交成功！`;
})
app.use(router.routes());

module.exports = app;
