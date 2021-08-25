import { APIGatewayProxyEvent } from "aws-lambda";
import { Context } from 'aws-lambda/handler';
import { LambdaResponse } from "../types/response";
import AWS from 'aws-sdk';
import { badRequestError, forbidden, ok } from "../utils/errors";
import { Logger } from '../utils/logger';


const s3 = new AWS.S3({ apiVersion: '2006-03-01' });


export const check = async (event: APIGatewayProxyEvent, context: Context): Promise<LambdaResponse> => {
  const logger = new Logger(context);
  const bucketParams = { Bucket: 'se-resources-staging-bucket', Key: 'domains' };
  const data = await s3.getObject(bucketParams).promise();
  const domains = data.Body.toString();
  const params = event.queryStringParameters || {};
  let email: string;

  if (params.email) {
    email = params.email;
  } else {
    return badRequestError;
  }

  logger.info('Validating email address...');
  const splittedDomains = domains.split('\n');

  for (const domain of splittedDomains) {
    console.log(`Domain name: ${domain}`);

    if (email.endsWith(domain)) {
      console.log(`Email: ${email}, Domain: ${domain}`);

      return ok;
    }

    if (email.endsWith('')) {
      return forbidden;
    }
  }

  return forbidden;
};
