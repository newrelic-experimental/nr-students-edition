import { SendEmailRequest } from "aws-sdk/clients/ses";

export type EmailContent = {
  description: string;
  traps: Array<Buffer>;
};

export type EmailRequestParams = {
  destAddr: string[],
  srcAddr: string,
  subject: string,
  body: string,
  charset?: string,
};


export const createSendEmailRequest = (emailRequestParams: EmailRequestParams): SendEmailRequest => {
  return {
    Destination: {
      ToAddresses: emailRequestParams.destAddr,
    },
    Message: {
      Body: {
        Html: {
          Charset: emailRequestParams.charset ?? 'UTF-8',
          Data: emailRequestParams.body,
        },
      },
      Subject: {
        Charset: emailRequestParams.charset ?? 'UTF-8',
        Data: emailRequestParams.subject,
      },
    },
    Source: emailRequestParams.srcAddr,
  };
};
