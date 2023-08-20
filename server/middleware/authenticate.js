const jwt = require("jsonwebtoken");
const userdb = require("../models/userSchema");
const keysecret = "sjkhuiokjnbvgfdrtyuikjhgfdertfcv";



const authenticate = async (req, res, next) => {
          try {
                    const token = req.headers.authorization;
                    // console.log("Token  ...   " + token);   


                    const verifytoken = jwt.verify(token, keysecret);
                    // console.log(verifytoken);

                    const rootUser = await userdb.findOne({
                              _id: verifytoken._id
                    });
                    // console.log("Root User....    " + rootUser);


                    if (!rootUser) {
                              throw new Error("User not found")
                    }

                    req.token = token
                    req.rootUser = rootUser
                    req.userId = rootUser._id

                    next();





          } catch (error) {
                    res.status(401).json({
                              status: 401,
                              message: "Unauthorised no token provided"
                    })

          }
}


module.exports = authenticate;