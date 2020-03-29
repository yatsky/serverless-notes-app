//import stripePackage from "stripe";
import { calculateCost } from "./libs/billing-lib";
import { success, failure } from "./libs/response-lib";

export async function main(e, context) {
    const { storage, source } = JSON.parse(e.body);
    const amount = calculateCost(storage);
    const description = "Scratch charge";


    //Load our secret key from the environment variables
    const stripe = require("stripe")(process.env.stripeSecretKey);

    try {
        await stripe.charges.create({
            source,
            amount,
            description,
            currency: "usd"
        });
        return success({ status: true });
    } catch (err){
        return failure({ message: err.message });
    }
}