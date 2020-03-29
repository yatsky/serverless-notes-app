import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";
import { fail } from "assert";


export function main(e, context, cb) {
    // Request body is passed in as a JSON encoded string in 'event.body'
    // It represents the HTTP request parameters
    const data = JSON.parse(e.body);

    const params = {
        // The table name is read from the environment variable
        // using process.env.tableName
        // This variable will be set in serverless.yml
        // Somehow this is not working.
        // TableName: process.env.tableName,
        TableName: "notes",
        // 'Item' contains the attributes of the item to be created
        // - 'userId': user identities are federated through the
        //             Cognito Identity Pool, we will use the identity
        //             id as the user id of the authenticated user
        //             It seems like Cognito Identity Pool is different from
        //             User Pool.
        //             https://serverless-stack.com/chapters/mapping-cognito-identity-id-and-user-pool-id.html

        // - 'noteId': a unique uuid
        // - 'content': parsed from request body
        // - 'attachment': parsed from request boday
        // - 'createdAt': current Unix timestamp
        Item: {
            userId: e.requestContext.identity.cognitoIdentityId,
            noteId: uuid.v1(),
            content: data.content,
            attachment: data.attachment,
            createdAt: Date.now()
        }

    };

    try {
        // use async/await patter to allow us to
        // return once we are done processing
        await dynamoDbLib.call("put", params);
        return success(params.Item);
    } catch (err) {
        return failure({ status: false });
    }
}