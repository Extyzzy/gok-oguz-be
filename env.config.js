const fs = require('fs-extra');

const dotenv = require('dotenv');
const { expand:dotenvExpand } = require('dotenv-expand');


const config = dotenv.config();
dotenvExpand(config);

const NODE_ENV = process.env.NODE_ENV || 'development';

[`.env.${NODE_ENV}.local`, NODE_ENV !== 'test' && '.env.local', `.env.${NODE_ENV}`, '.env']
  .filter(Boolean)
  .forEach((dotenvFile) => {
    if (!fs.existsSync(dotenvFile)) return;
    dotenvExpand(dotenv.config({
      path: dotenvFile,
    }));
  });
