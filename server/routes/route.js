const express = require("express");
const router = new express.Router();
const userdb = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");



router.post("/register", async (req, res) => {
          // console.log(req.body);
          try {
                    const {
                              name,
                              email,
                              password,
                              cpassword
                    } = req.body;

                    if (!name || !email || !password || !cpassword) {
                              return res.status(400).json({
                                        msg: "Please fill all fields"
                              });
                    } else {
                              const user = await userdb.findOne({
                                        email: email
                              });

                              if (user) {
                                        return res.status(201).send('User already exists');
                              } else {

                                        const hashpassword = await bcrypt.hash(password, 12);


                                        const addUser = new userdb({
                                                  name,
                                                  email,
                                                  password: hashpassword,
                                                  cpassword: hashpassword
                                        });

                                        const storedata = await addUser.save();
                                        // console.log(storedata);



                                        res.status(201).json({
                                                  message: "Registration successful!",
                                                  storedata,
                                                  status: 201
                                        })
                              }
                    }
          } catch (error) {
                    console.log(`Error in register ${error}`);
          }



})




//user login
router.post("/login", async (req, res) => {
          // console.log(req.body);
          try {
                    const {
                              email,
                              password
                    } = req.body;

                    if (!email || !password) {
                              throw Error("All fields are required");
                    } else {
                              const checkEmail = await userdb.findOne({
                                        email: email
                              });

                              if (!checkEmail) {
                                        throw Error("Invalid Email ");
                              } else {
                                        const isMatch = await bcrypt.compare(password, checkEmail.password);

                                        if (!isMatch) {
                                                  throw Error('Password does not match');
                                        } else {
                                                  // console.log("login");


                                                  //token generate
                                                  const token = await checkEmail.generatAuthToken();
                                                  // console.log(token);

                                                  //generate cookie
                                                  res.cookie("usercookie", token, {
                                                            expires: new Date(Date.now() + 9000000),
                                                            httpOnly: true
                                                  });

                                                  const result = {
                                                            checkEmail,
                                                            token
                                                  };
                                                  // console.log(result);

                                                  res.status(201).json({
                                                            status: 201,
                                                            message: "Successfull login user",
                                                            result
                                                  })
                                        }
                              }
                    }

          } catch (error) {
                    return res.sendStatus(403).json({
                              error: "Not Login user"
                    })
          }
});






//valid user
router.get("/validuser", authenticate, async (req, res) => {
          // console.log("done");
})





module.exports = router;