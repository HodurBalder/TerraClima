import Mongoose from 'mongoose';
import UserService from '../services/user/user';

// import Services from '../services';
// import Config from './config';
import { useRuntimeConfig } from '#imports';


const connectToDatabase = async (): Promise<void> => {
  Mongoose.set('strictQuery', false);
  const config = useRuntimeConfig();
  const mongodb = process.env.MONGODB || '';
  console.log('mongodb', mongodb);
  try {
    await Mongoose.connect(mongodb as string, {});
    console.info(`[MONGODB] (SUCCESS) ${mongodb}`);

    const adminUser = await UserService.findUserByEmail('admin@example.com');

    if (!adminUser) {
        console.log('Creando usuario administrador predeterminado...');
        await UserService.createUser({
          role: 'admin',
          name: 'Admin',
          phone: '1234567890',
          email: 'admin@example.com',
          password: 'adminpassword123', 
        });
        console.log('Usuario administrador creado correctamente');
      }

    console.info('✅ MongoDB conectado correctamente.');
  } catch (error) {
    console.error(`[MONGODB] (ERROR) ${mongodb}`);
    console.error(error);
    throw new Error('Error al conectar con MongoDB');
  }
};

export default connectToDatabase;