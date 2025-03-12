import UserModel from '../../models/user.model';
import Methods from '../../utils/methods';

interface CreateUserParams {
  role: string;
  name: string;
  email: string;
  phone: string;
  password: string;
}

interface UpdateUserParams {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  role?: string;
}

class UserService {
  async findUserById(id: string) {
    try {
      return await UserModel.findById(id);
    } catch (error) {
      console.error('Error al buscar usuario por ID:', error);
      throw new Error('Error al buscar usuario por ID');
    }
  }

  async findUserByEmail(email: string) {
    try {
      return await UserModel.findOne({ email });
    } catch (error) {
      console.error('Error al buscar usuario por email:', error);
      throw new Error('Error al buscar usuario por email');
    }
  }

  async createUser(userData: CreateUserParams) {
    try {
      const newUser = new UserModel(userData);
      return await newUser.save();
    } catch (error) {
      console.error('Error al crear usuario:', error);
      throw new Error('Error al crear usuario');
    }
  }

  async updateUser(id: string, userData: UpdateUserParams) {
    try {
      return await UserModel.findByIdAndUpdate(
        id,
        { ...userData, updated: new Date() },
        { new: true }
      );
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      throw new Error('Error al actualizar usuario');
    }
  }

  async deleteUser(id: string) {
    try {
      return await UserModel.findByIdAndDelete(id);
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      throw new Error('Error al eliminar usuario');
    }
  }

  async findAllUsers(query = {}) {
    try {
      return await UserModel.find(query);
    } catch (error) {
      console.error('Error al buscar usuarios:', error);
      throw new Error('Error al buscar usuarios');
    }
  }

  async validateUserCredentials(email: string, password: string) {
    try {
      const user = await UserModel.findOne({ email }).select('+password');
      if (!user) return null;
      
      const isPasswordValid = Methods.bcryptCompare(password, user.password);
      if (!isPasswordValid) return null;
      
      // No devolver la contraseña
      const userObject = user.toObject();
      delete userObject.password;
      
      return userObject;
    } catch (error) {
      console.error('Error al validar credenciales:', error);
      throw new Error('Error al validar credenciales de usuario');
    }
  }
}

export default new UserService();