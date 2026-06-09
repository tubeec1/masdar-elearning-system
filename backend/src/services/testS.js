let testModel = require("../models/testM.js");

let gettestS = async () => {
    let response = await testModel.getTestsM();

    return {
        status: true,
        message: "hello world",
        data: response
    };
};

module.exports ={gettestS}