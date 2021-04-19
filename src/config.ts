import { cleanEnv, str } from 'envalid';
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
  }
);

export type AppConfig = Readonly<{
  STAGE: string;
  REGION: string;
  DATABASE_RESOURCE_ARN: string;
  DATABASE_SECRET_ARN: string;
  DATABASE: string;
}>;
