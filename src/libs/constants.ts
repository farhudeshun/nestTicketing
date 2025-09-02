import 'dotenv';

export const CACHE_TIMEOUT: number = +process.env.CACHE_TIMEOUT || 120;

export const RABBIT_URI = (): string[] => {
  const rabbitUri = process.env.RABBIT_URI || 'amqp://127.0.0.1:5672';
  const [credential, hosts] = rabbitUri.split('@');
  const hostList = hosts.split(',');
  return hostList.map((host, index) => {
    return `${credential}@${host}`;
  });
};
