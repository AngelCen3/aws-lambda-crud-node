const AWS = require("aws-sdk");

const getTasks = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const result = await dynamodb
    .scan({
      TableName: "TaskTable",
    })
    .promise(); //Scan es como hacer un fech de toda la table

  const tasks = result.Items;

  return {
    status: 200,
    body: { tasks }
  };
};

module.exports = { getTasks };
