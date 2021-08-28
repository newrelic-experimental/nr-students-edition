import { SES } from 'aws-sdk';
import { config } from '../../config';
import { createSendEmailRequest, EmailRequestParams } from '../../types/email';


export const sendEmailWithCode = async (code: string, destinationAddress: string): Promise<void> => {
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
  } catch (error) {
    console.error(error.message);
    console.error('For some reason email could not be sent');
  }
};
