const {
          default: mongoose
} = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keysecret = "sjkhuiokjnbvgfdrtyuikjhgfdertfcv";




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



//generate token
userSchema.methods.generatAuthToken = async function () {
          try {
                    const token = jwt.sign({
                              _id: this._id.toString()
                    }, keysecret);
                    this.tokens = this.tokens.concat({
                              token
                    });
                    await this.save();
                    return token;
          } catch (error) {
                    throw new Error("Not generate token.....")

          }
}




const userdb = mongoose.model("users", userSchema);
module.exports = userdb;