
let testService = require("../services/testS")
let  getTests = async (req ,res)=>{
  let response = await testService.gettestS()

  res.json(response);
  
}

module.exports ={getTests}