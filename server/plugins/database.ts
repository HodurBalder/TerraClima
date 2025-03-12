import connectToDatabase from '../utils/database';

export default defineNitroPlugin(async () => {
  await connectToDatabase();
});