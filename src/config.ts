import { cleanEnv, str, email } from 'envalid';
import { config as loadEnv } from 'dotenv';


const dotEnvPath = process.env.NODE_ENV === 'test' ? '.test.env' : '.env';

export const config = cleanEnv(
  {
    ...loadEnv({ path: dotEnvPath }).parsed,
    ...process.env,
  },
  {
    STAGE: str(),
    REGION: str(),
    DATABASE_RESOURCE_ARN: str(),
    DATABASE_SECRET_ARN: str(),
    DATABASE: str(),
    GITHUB_URL: str(),
    GITHUB_ACCESS_TOKEN_URL: str(),
    GITHUB_USER_DATA_URL: str(),
    GITHUB_API_USER_URL: str(),
    GITHUB_CLIENT_ID: str(),
    GITHUB_SECRET: str(),
    SOURCE_EMAIL_ADDRESS: email()
  }
);

export type AppConfig = Readonly<{
  STAGE: string;
  REGION: string;
  DATABASE_RESOURCE_ARN: string;
  DATABASE_SECRET_ARN: string;
  DATABASE: string;
  GITHUB_URL: string;
  GITHUB_ACCESS_TOKEN_URL: string;
  GITHUB_USER_DATA_URL: string;
  GITHUB_API_USER_URL: string;
  GITHUB_CLIENT_ID: string;
  GITHUB_SECRET: string;
  SOURCE_EMAIL_ADDRESS: string;
}>;
