const { v4 } = require("uuid");
const AWS = require("aws-sdk");

const addTask = async (event) => {

  const dynamodb = new AWS.DynamoDB.DocumentClient(); //Esto ara que intentara conectarse a nuestra base de datos

  const { title, description } = JSON.parse(event.body); //El event.body lo pasamos a formato JSON para que el servidor lo entienda
  const createAt = new Date();
  const id = v4();

  const newTask = {
    id,
    title, 
    description,
    createAt
  }

  await dynamodb.put({
    TableName: 'TaskTable',  //Este es el nombre de la table que declaramos en el archivo serverless.yml
    Item: newTask   //Esto guardara un objeto    
  }).promise() //Lo que hace put es que nos permite guardar un dato

  return{
    statusCode: 200,
    body: JSON.stringify(newTask)
  } 
};

module.exports = { addTask };
