import AWS from "aws-sdk";

export function call(action, params) {
    const dynamoDb = new AWS.DynamoDB.DocumentClient();

    // we use promise to manage asynchronous code
    return dynamoDb[action](params).promise();
}