import { Schema, model } from 'mongoose';
import { compare, genSalt, hash } from 'bcryptjs';

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// Match user-entered password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await compare(enteredPassword, this.password);
};

// Encrypt password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    const salt = await genSalt(10);
    this.password = await hash(this.password, salt);
    next();
});

const User = model('User', userSchema);

export default User;
