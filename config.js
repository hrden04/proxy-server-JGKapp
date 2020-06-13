require('dotenv').config();

const env = process.env.NODE_ENV || 'dev'; // 'dev' or 'prod' default to dev if no .env file

const dev = {
  app: {
    port: parseInt(process.env.DEV_APP_PORT, 10) || 7000,
  },
  proxies: {
    description: 'http://localhost:8000',
    images: 'http://localhost:5000',
    qna: 'http://localhost:4500',
    similar: 'http://localhost:3000',
    reviews: 'http://localhost:3030',
  },
};

const prod = {
  app: {
    port: parseInt(process.env.PROD_APP_PORT, 10) || 7000,
  },
  proxies: {
    description: 'PLACE_AWS_ADDRESS_HERE',
    qna: 'PLACE_AWS_ADDRESS_HERE',
    images: 'PLACE_AWS_ADDRESS_HERE',
    similar: 'PLACE_AWS_ADDRESS_HERE',
    reviews: 'PLACE_AWS_ADDRESS_HERE',
  },
};

const config = {
  dev,
  prod,
};

module.exports = config[env];
