const {
          default: mongoose
} = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");




const userSchema = mongoose.Schema({
          name: {
                    type: String,
                    required: true
          },
          email: {
                    type: String,
                    required: true,
                    unique: true,
                    validator(value) {
                              if (!validator.Email("@")) {
                                        throw new Error('Invalid Email')
                              }
                    }
          },
          password: {
                    type: String,
                    required: true,
                    minlength: 6
          },
          cpassword: {
                    type: String,
                    required: true,
                    minlength: 6
          },
          tokens: [{
                    token: {
                              type: String,
                              required: true
                    }
          }]
});



//hash password...
userSchema.pre("save", async function (next) {
          if (this.isModified("password")) {
                    this.password = await bcrypt.hash(this.password, 12);
                    this.cpassword = await bcrypt.hash(this.cpassword, 12);
          }

          next();

})




const userdb = mongoose.model("users", userSchema);
module.exports = userdb;