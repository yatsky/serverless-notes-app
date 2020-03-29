import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(e, context) {
    const params ={
        TableName: "notes",
        Key: {
            userId: e.requestContext.identity.cognitoIdentityId,
            noteId: e.pathParameters.id
        }
    };

    try {
        await dynamoDbLib.call("delete", params);
        return success({ status: true });
    } catch (err) {
        return failure({status:false});
    }

}