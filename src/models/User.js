const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const UserSchema = mongoose.Schema(
  {
    user: {
      type: String,
      unique: true,
      require: true
    },
    password: {
      type: String,
      require: true
    },
    bio: {
      type: String,
      require: true
    }
  },
  { timestamps: true }
);

UserSchema.pre("save", async function hashPassword(next) {
  if (!this.isModified("password")) next();

  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods = {
  compareHash(hash) {
    return bcrypt.compare(hash, this.password);
  },

  genereteToken() {
    return jwt.sign({ id: this.id }, "secret", {
      expiresIn: 604800
    });
  }
};

mongoose.model("User", UserSchema);
