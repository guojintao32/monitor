//import DbHelper from './dbHelper';
const DbHelper = require('./DbHelper')
const mongoose = DbHelper.connect();

const testSchema = new mongoose.Schema({
  name:String
});

const testCol = mongoose.model('nodeTest',testSchema);

const testModel = {
    async add (item){
      const test = new testCol(item);
      await test.save(err=>{
        if(err){
          console.log(err)
        }
        console.log("数据保存成功了...");
      })
      return item;
    },
    async find(query) {
      await testCol.find({name:'1232312'}, (err,data)=> {
        console.log(data)
        if (err) {
          console.log(JSON.stringify(err));
        }
      });
    }
}
module.exports = testModel;
//export default testModel;