import { cleanEnv, url } from 'envalid';

export const CONFIG = cleanEnv(process.env, {
  BASE_URL: url({
    default: 'https://store.cpanel.net',
    desc: 'The base URL of the application under test.',
  }),
});
