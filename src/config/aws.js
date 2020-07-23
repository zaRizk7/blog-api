import 'dotenv/config';

const { AWS_ACCESS_KEY_ID, AWS_SECRET_KEY } = process.env;

/** AWS Configuration */
const awsConfig = {
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_KEY,
};

export default awsConfig;
