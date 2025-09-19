import { Callback, Context, Handler } from 'aws-lambda';
import serverlessExpress from '@codegenie/serverless-express';

import { app } from './app';

let server: Handler;

async function bootstrap() {
  const nestApp = await app();

  await nestApp.init();
  const expressApp = nestApp.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  context.callbackWaitsForEmptyEventLoop = false;
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};