const Vue = require('vue');
const path = require('path');

const renderer = require('vue-server-renderer').createRenderer({
  template:require('fs').readFileSync(path.resolve(__dirname,'./index.template.html'),'utf-8')
});

module.exports = function(){
  const app = new Vue({
    template:'<div>{{message}}</div>',
    data:{
      message:'Index page!'
    }
  })
  const renderer = require('vue-server-renderer').createRenderer({
    template:require('fs').readFileSync(path.resolve(__dirname,'./index.template.html'),'utf-8')
  });
  return renderer.renderToString(app,{title:'首页'});
}