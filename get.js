import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(e, context) {
    const params = {
        TableName: "notes",
        Key: {
            userId: e.requestContext.identity.cognitoIdentityId,
            noteId: e.pathParameters.id
        }
    };


    try {
        const result = await dynamoDbLib.call("get", params);
        if (result.Item) {
            // Return the retrieved item
            return success(result.Item);
        } else {
            return failure({ status: false, error: "Item not found."});
        }
    } catch (err) {
        return failure({ status: false });
    }
}