import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(e, context){
    const params = {
        TableName: "notes",

        KeyConditionExpression: "userId=:userId",
        ExpressionAttributeValues: {
            ":userId": e.requestContext.identity.cognitoIdentityId
        }
    };


    try {
        const result = await dynamoDbLib.call("query", params);
        // return the matching list of items in response body
        return success(result.Items);
    } catch (err) {
        console.log(err);
        return failure( { status: false });
    }
}