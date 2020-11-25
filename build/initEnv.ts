import dotEnvExtended from 'dotenv-extended';

export const rawEnv = dotEnvExtended.load();

export const env = {
  FA_PRO_NPM_TOKEN: rawEnv.FA_PRO_NPM_TOKEN,
  GATSBY_BUILD_MODE: rawEnv.GATSBY_BUILD_MODE,
  GH_ACCESS_TOKEN: rawEnv.GH_ACCESS_TOKEN,
  NODE_ENV: rawEnv.NODE_ENV,
  RELATIVE_CI_KEY: rawEnv.RELATIVE_CI_KEY,
};
