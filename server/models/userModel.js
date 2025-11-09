const  mongoose = require( "mongoose");
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    name: {
      type: String,
      trim: true,
      required:true,
      maxlength: 50,
    },
    bio: {
      type: String,
      maxlength: 160,
      default: "",
    },
    avatar: {
      type: String,
      default: "",
    },
    banner: {
      type: String,
      default: "",
    },

    // 🔹 Friendship system
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    friendRequestsSent: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    friendRequestsReceived: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    verified: {
      type: Boolean,
      default: false,
    },
     verificationToken: String,
    passwordResetToken: String,
    passwordResetExpires: Date,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    lastLogin: {
      type: Date,
    },
  },
  { timestamps: true }
);

userSchema.index({ username: 1, email: 1 }); // fast lookup by username/email
userSchema.index({ friends: 1 });           // fast queries for friends list


// Hide sensitive fields
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};


// Password Hasher

userSchema.pre("save", async function(next)  {
    if(!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

userSchema.methods.matchPassword = async function(entered) {
return bcrypt.compare(entered,this.password)
}

module.exports = mongoose.model("User", userSchema);
