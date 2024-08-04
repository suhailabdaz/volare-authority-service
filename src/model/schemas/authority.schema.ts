import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export interface IAuthority extends Document {
  name: string;
  password: string;
  comparePassword: (password: string) => Promise<boolean>;
  SignAccessToken: () => string;
  SignRefreshToken: () => string;
}

const authoritySchema: Schema<IAuthority> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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

authoritySchema.pre<IAuthority>('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  this.password = await bcrypt.hash(this.password || '', 10);
  next();
});

// sign access Token
authoritySchema.methods.SignAccessToken = function () {
  return jwt.sign(
    { id: this._id, role: this.role || 'authority' },
    process.env.ACCESS_TOKEN || 'suhail',
    {
      expiresIn: '5m',
    }
  );
};

// sign refresh token
authoritySchema.methods.SignRefreshToken = function () {
  return jwt.sign(
    { id: this._id, role: this.role || 'authority' },
    process.env.REFRESH_TOKEN || 'suhail',
    {
      expiresIn: '3d',
    }
  );
};

// compare password
authoritySchema.methods.comparePassword = async function (
  enteredPassword: string
) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const AuthorityModel: Model<IAuthority> = mongoose.model(
  'Authority',
  authoritySchema
);
export default AuthorityModel;
