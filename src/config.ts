import { cleanEnv, str } from 'envalid';

const dotEnvPath = process.env.NODE_ENV === 'test' ? '.test.env' : '.env';

export const config = cleanEnv(dotEnvPath, {
  STAGE: str(),
  REGION: str(),
  DATABASE_RESOURCE_ARN: str(),
  DATABASE_SECRET_ARN: str(),
  DATABASE: str(),
});
