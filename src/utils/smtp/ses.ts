import { SES } from 'aws-sdk';
import { config } from '../../config';
import { createSendEmailRequest, EmailRequestParams } from '../../types/email';
import { Logger } from '../../utils/logger';


export const sendEmailWithCode = async (code: string, destinationAddress: string, logger: Logger): Promise<void> => {
  const awsSesSourceAddress = config.SOURCE_EMAIL_ADDRESS;
  const awsSesSubject = 'New Relic Validation Code';

  try {
    const sesClient = new SES();
    const emailBody = code; // TODO: prepare some kind of template
    const destAddresses = new Array<string>();

    destAddresses.push(destinationAddress);

    const emailParams = {
      srcAddr: awsSesSourceAddress,
      destAddr: destAddresses,
      subject: awsSesSubject,
      body: emailBody as string
    } as EmailRequestParams;

    const email = createSendEmailRequest(emailParams);

    await sesClient.sendEmail(email).promise();
  } catch (error: any) {
    logger.error(`For some reason email could not be sent. Detailed message: ${error.message}`);
  }
};
