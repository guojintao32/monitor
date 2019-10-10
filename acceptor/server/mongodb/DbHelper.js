//import mongoose from 'mongoose';
const mongoose = require('mongoose')
let connectTimeOut;
 const DbHelper = {
  connectTimes: 8,
  connect() {
    DbHelper.mongooseConnect();
    const db = mongoose.connection;
    db.once('error', () => {
      console.error('连接 mongodb 失败。');
      connectTimeOut = setInterval(() => {
        if (DbHelper.connectTimes > 0) {
          console.log(`正在重连 mongodb，剩余次数 ${DbHelper.connectTimes}。`);
          DbHelper.connectTimes -= 1;
          DbHelper.mongooseConnect();
        } else {
          console.log('重连 mongodb 失败。');
          clearTimeout(connectTimeOut);
        }
      }, 8000);
    });
    db.on('open', () => {
      console.log('连接 mongodb 成功。');
      clearTimeout(connectTimeOut);
    });
    // 单例模式
    DbHelper.connect = () => {
      return mongoose;
    };
    return mongoose;
  },
  mongooseConnect() {
    mongoose.connect('mongodb://localhost/test', {
      useNewUrlParser: true,
      // 弃用警告 https://mongoosejs.com/docs/deprecations.html#-findandmodify-
      useFindAndModify: false
    });
  }
}
module.exports = DbHelper;
//export default DbHelper;
