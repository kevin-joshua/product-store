import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

// Password hashing middleware
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const rounds = 10;
  const salt = await bcrypt.genSalt(rounds);
  this.password = await bcrypt.hash(this.password, salt);  // Ensure you await bcrypt.hash()

  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
