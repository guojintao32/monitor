const { DbHelper, ObjectId } = require('./DbHelper');
var log4js = require('log4js');
var logger = log4js.getLogger();
const mongoose = DbHelper.connect();

const performanceSchema = new mongoose.Schema({
  redirectTime: Number,
  dnsTime: Number,
  ttfbTime: Number,
  appcacheTime: Number,
  unloadTime: Number,
  tcpTime: Number,
  reqTime: Number,
  analysisTime: Number,
  blankTime: Number,
  domReadyTime: Number,
  userAgent:String,
  jsTime:Number,
  cssTime:Number,
  ip:String
});

const performanceCol = mongoose.model('performance', performanceSchema);
logger.level = 'info';
const performanceModal = {
  async add(item) {
    const incorrectCol = new performanceCol(item);
    const result = await incorrectCol.save(err => {
      if (err) logger.error(err)
      logger.info('数据保存成功！')
    });
    return result
  },
  count(query) {
    return new Promise((resolve, reject) => {
      IncorrectCol.count(query, (err, total) => {
        if (err) {
          logger.error(err);
          reject(err);
        }
        resolve(total)
      })
    })
  },
}
module.exports = performanceModal;