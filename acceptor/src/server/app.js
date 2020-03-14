//import testModel from './mongodb/model';
const testModel = require('./mongodb/model');
const incorrectModal = require('./mongodb/incorrect.model');
const performanceModal = require('./mongodb/performance.model');
const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const koaBody = require('koa-bodyparser');
const fs = require('fs');
const path = require('path');
const SourceMap = require('source-map');
const {sourceMapPath} = require('./config');
const { readFileSync } = fs;
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
    ctx.response.body = '后台服务中~！';
});
router.get('/testadd', async (ctx, next) => {
    let name = '123123123'
    if (ctx.querystring) {
        name = ctx.querystring.split('name=')[1];
    }
    testModel.add({ name });
    ctx.response.body = '<h1>testadd</h1>';
});
router.get('/testfind', async (ctx, next) => {
    const res = await testModel.find();
    ctx.response.body = '<h1>testfind</h1>';
});
function getSearchparamFromType(type) {
    let serachParam;
    if (type === 'js') {
        serachParam = { 'type': 'scriptError' };
    }
    else if (type === 'resource') {
        serachParam = { 'type': 'reasourceError' }
    }
    else if (type === 'http') {
        serachParam = { 'type': 'httpError' }
    }
    return serachParam
}
//从数据库获取所有错误列表
router.get('/incorrect/list', async (ctx) => {
    const res = await incorrectModal.find(ctx.query);
    ctx.response.body = res;
})
//从数据库获取数量
const moment = require('moment');
router.get('/getCount/chart', async (ctx) => {
    const query = ctx.request.query;
    const list = await incorrectModal.find(getSearchparamFromType(query.type));
    let dateCount = {};
    for (let item of list) {
        let dateKey = moment(item.time).format('YYYY-MM-DD');
        if (!dateCount[dateKey]) {
            dateCount[dateKey] = 1;
        }
        else {
            dateCount[dateKey]++;
        }
    }
    ctx.response.body = dateCount;
})
//根据来源从数据库获取报错信息
router.get('/getList', async (ctx) => {
    const query = ctx.request.query;
    query.pageNum = parseInt(query.pageNum) || 1;
    query.pageSize = parseInt(query.pageSize) || 10;
    let findParam = getSearchparamFromType(query.type);
    if (query.startTime) {
        findParam.last_time = {
            $lte: parseInt(query.endTime),
            $gte: parseInt(query.startTime)
        }
    }
    //当sort,skip,limit一起使用时，无论其位置变化，总是先sort再skip，最后limit。
    const [list, total] = await Promise.all([
        incorrectModal.aggregate([
            { $group: { _id: "$reason", times: { $sum: 1 }, last_time: { $max: "$time" }, type: { $first: "$type" } } },
            { $match: findParam },
            { $sort: { last_time: -1 } }, { $skip: parseInt((query.pageNum - 1) * query.pageSize) }, { $limit: parseInt(query.pageSize) },
        ]),
        incorrectModal.aggregateCount([
            { $group: { _id: "$reason", times: { $sum: 1 }, last_time: { $max: "$time" }, type: { $first: "$type" } } },
            { $match: findParam }])]);
    ctx.response.body = {
        body: {
            list,
            pageInfo: {
                pageNum: query.pageNum,
                pageSize: query.pageSize,
                total
            }
        }
    }
})
//获取详情列表
router.get('/getDetail', async (ctx) => {
    const query = ctx.request.query;
    query.pageNum = parseInt(query.pageNum) || 1;
    query.pageSize = parseInt(query.pageSize) || 10;
    let options = {};
    options.limit = parseInt(query.pageSize);
    options.skip = parseInt((query.pageNum - 1) * query.pageSize);
    const [list, total] = await Promise.all([incorrectModal.find({ reason: query.reason }, options), incorrectModal.count({ reason: query.reason })])
    ctx.response.body = {
        body: {
            list,
            pageInfo: {
                pageNum: query.pageNum,
                pageSize: query.pageSize,
                total
            }
        }
    }
})
//获取错误所在行列
router.get('/getDetailFromSourceMap', async (ctx) => {
    const query = ctx.request.query;
    if (!query.fileName) {
        ctx.response.body = '未查到对应sourceMap文件！';
    }
    else {
        let rawSourceMap;
        const { SourceMapConsumer } = SourceMap;
        try {
            rawSourceMap = JSON.parse(readFileSync(path.resolve(__dirname,sourceMapPath,fileName), 'utf8'))
        }
        catch (e) {
            rawSourceMap = null;
            ctx.response.body = '未查到对应sourceMap文件！';
        }
        if(rawSourceMap){
            const xSquared = await SourceMapConsumer.with(rawSourceMap, null, consumer => {
                const pos = consumer.originalPositionFor({
                    line: parseInt(query.row),
                    column: parseInt(query.col)
                });
    
                return pos;
            });
            ctx.response.body = xSquared;
        }

    }
})
//删除错误
router.post('/removeAll', async (ctx, next) => {
    const res = await testModel.remove();
    ctx.response.body = '<h1>remove</h1>';
});
router.post('/remove', async (ctx, next) => {
    const _id = ctx.request.body._id;
    const res = await incorrectModal.remove({ _id }).catch(e => {
        ctx.response.body = e.message;
    });
    if (res) {
        ctx.response.body = '删除成功！';
    }
})
//提交错误
router.post('/report', async (ctx, next) => {
    const userAgent = ctx.get("user-agent");
    const res = await incorrectModal.add({
        userAgent,
        ip:ctx.request.ip,
        ...ctx.request.body
    })
    ctx.response.body = `提交成功！`;
})
//提交性能数据
router.post('/performance',async(ctx)=>{
    const userAgent = ctx.get('user-agent');
    const res = await performanceModal.add({
        userAgent,
        time:new Date().getTime(),
        ip:ctx.request.ip,
        ...ctx.request.body
    });
    ctx.response.body = `提交成功！`;
})
//查询某一项性能指标
router.get('/performance/getCol',async(ctx)=>{
    const col = ctx.request.query.col;
    const res = await performanceModal.findByCol(col);
    ctx.response.body = res;
})
app.use(router.routes());

module.exports = app;
