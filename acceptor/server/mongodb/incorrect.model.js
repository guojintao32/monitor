const DbHelper = require('./DbHelper')
var log4js = require('log4js');
var logger = log4js.getLogger();
const mongoose = DbHelper.connect();

const incorrectSchema = new mongoose.Schema({
  time:Number,
  href:String,
  type:String,
  reason:String,
  form:String,
});

const IncorrectCol = mongoose.model('incorrects',incorrectSchema);
logger.level = 'info';
const incorrectModal = {
  async add (item){
    const incorrectCol = new IncorrectCol(item);
    const result = await incorrectCol.save(err=>{
      if(err) logger.error(err)
      logger.info('数据保存成功！')
    });
    return result
  },
  async find(query){
    result = await new Promise(resolve => {
      IncorrectCol.find(query, (err,data)=> {
        if (err) {
          logger.error(err)
        }
        resolve(data)
      });
    });
    return result
  },
  async remove(query){
    await IncorrectCol.remove(query, (err,data)=> {
      console.log(data)
      if (err) {
        logger.error(err)
      }
    });
  }
}
module.exports = incorrectModal;