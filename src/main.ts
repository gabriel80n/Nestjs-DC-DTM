import { networkInterfaces } from 'os';
import { app } from './app';

function findLocalIp(): string | undefined {
  const interfaces = networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
}

const port = process.env.PORT || 3000;

async function bootstrap() {
  (await app()).listen(port, () => {
    console.log('\n\nServer running on:\n');
    console.log(
      '\x1b[36m%s\x1b[0m',
      `  - http://localhost:${port}${process.env.BASE_PATH}`,
    );
    const ip = findLocalIp();
    !ip ||
      console.log(
        '\x1b[36m%s\x1b[0m',
        `  - http://${ip}:${port}${process.env.BASE_PATH}`,
      );

    console.log('\nSwagger running on:\n');
    console.log(
      '\x1b[36m%s\x1b[0m',
      `  - http://localhost:${port}${process.env.BASE_PATH}/${process.env.SWAGGER_PATH}`,
    );
    !ip ||
      console.log(
        '\x1b[36m%s\x1b[0m',
        `  - http://${ip}:${port}${process.env.BASE_PATH}/${process.env.SWAGGER_PATH}`,
      );
  });
}

bootstrap();
