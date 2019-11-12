//import DbHelper from './dbHelper';
const {DbHelper} = require('./DbHelper')
var log4js = require('log4js');
var logger = log4js.getLogger();
const mongoose = DbHelper.connect();

const testSchema = new mongoose.Schema({
  name:String
});

const testCol = mongoose.model('nodeTest',testSchema);

logger.level = 'info';
const testModel = {
    async add (item){
      const test = new testCol(item);
      await test.save(err=>{
        if(err){
          logger.error(err)
        }
        logger.info("数据保存成功了...");
      })
      return item;
    },
    async find(query) {
      await testCol.find(query, (err,data)=> {
        console.log(data)
        if (err) {
          logger.error(err)
        }
      });
    },
    async remove(query){
      await testCol.remove(query,(err)=>{
        console.log(JSON.stringify(err));
      })
    }
}
module.exports = testModel;
//export default testModel;