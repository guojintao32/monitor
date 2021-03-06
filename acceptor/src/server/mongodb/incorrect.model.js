const { DbHelper, ObjectId } = require('./DbHelper');
var log4js = require('log4js');
var logger = log4js.getLogger();
const mongoose = DbHelper.connect();

const incorrectSchema = new mongoose.Schema({
  time: Number,
  href: String,
  type: String,
  reason: String,
  from: String,
  row:Number,
  col:Number,
  fileName:String,
  status:Number,
  userAgent:String,
});

const IncorrectCol = mongoose.model('incorrects', incorrectSchema);
logger.level = 'info';
const incorrectModal = {
  async add(item) {
    const incorrectCol = new IncorrectCol(item);
    const result = await incorrectCol.save(err => {
      if (err) logger.error(err)
      logger.info('数据保存成功！')
    });
    return result
  },
  aggregateCount(query) {
    return new Promise((resolve, reject) => {
      IncorrectCol.aggregate(query,
        (err, data) => {
          if (err) {
            logger.error(err);
            reject(err)
          }
          resolve(data.length)
        })
    })
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
  find(query, options) {
    return new Promise(resolve => {
      if (query && query._id) {
        query._id = ObjectId(query._id);
      }
      IncorrectCol.find(query, null, options, (err, data) => {
        if (err) {
          logger.error(err)
        }
        resolve(data)
      });
    });
  },
  remove(query) {
    return new Promise((resolve, reject) => {
      IncorrectCol.remove(query, (err, data) => {
        if (err) {
          logger.error(err);
          reject(err)
        }
        resolve(data)
      })
    })
  },
  aggregate(query) {
    return new Promise((resolve, reject) => {
      IncorrectCol.aggregate(query,
        (err, data) => {
          if (err) {
            logger.error(err);
            reject(err)
          }
          resolve(data)
        })
    })
  }
}
module.exports = incorrectModal;