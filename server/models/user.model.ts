import mongoose, { Schema, Document } from 'mongoose';
import Methods  from '../utils/methods';
interface User extends Document {
    role: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    updated: Date;
    created: Date;
}

const userSchema = new Schema<User>({
    role: { type: String, default: 'user' },
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    password: { type: String, select: false },
    updated: { type: Date },
    created: { type: Date, default: Date.now },
});

userSchema.pre('save', function (next) {
    this.updated = new Date();

    if (this.password) {
        this.password = Methods.bcryptHash(this.password); // Utiliza el método de hash
    }

    next();
});

userSchema.post('save', function (err, doc, next) {
    if (err) return next(new Error('Error al guardar el usuario'));
    next();
});

userSchema.post('remove', function (err, doc, next) {
    if (err) return next(new Error('Error al eliminar el usuario'));
    next();
});

userSchema.post('findOne', function (err, doc, next) {
    if (err) return next(new Error('Error al obtener el usuario'));
    next();
});

userSchema.post('find', function (err, doc, next) {
    if (err) return next(new Error('Error al obtener los usuarios'));
    next();
});

const UserModel = mongoose.model<User>('Users', userSchema);

export default UserModel;