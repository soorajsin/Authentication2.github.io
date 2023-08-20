const express = require("express");
const router = new express.Router();
const userdb = require("../models/userSchema");
const bcrypt = require("bcryptjs");



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
                                        console.log(storedata);
                              }
                    }
          } catch (error) {
                    console.log(`Error in register ${error}`);
          }
})




module.exports = router;