const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Load User model
const User = require("../models/userschema");
// Load input validation
const SignupValidation = require("../Validator/SignupValidation");
const SigninValidation = require("../Validator/SigninValidation");
module.exports = {
  //  ---------------------------------------- //signup method to add a new user//--------------------------- //

  signup: async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;

    const { errors, isValid } = SignupValidation(req.body);

    try {
      if (!isValid) {
        res.status(404).json(errors);
      } else {
        await User.findOne({ email }).then(async (exist) => {
          if (exist) {
            errors.email = "Email already in use";
            res.status(404).json(errors);
          } else {
            const hashedpassword = bcrypt.hashSync(password, 8);
            const result = await User.create({
              firstName,
              lastName,
              email,
              password: hashedpassword,
              role
            });
            res.status(200).json({ result });
          }
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
  //  ---------------------------------------- //signin method to add a new user//--------------------------- //
  signin: async (req, res) => {
    const { email, password } = req.body;
    const { errors, isValid } = SigninValidation(req.body);

    try {
      if (!isValid) {
        res.status(404).json(errors);
      } else {
        await User.findOne({ email }).then(async (user) => {
          if (!user) {
            errors.email =
              "Email does not exist ! please Enter the right Email or You can make account";
            res.status(404).json(errors);
          }
          // Compare sent in password with found user hashed password
          const passwordMatch = bcrypt.compareSync(password, user.password);
          if (!passwordMatch) {
            errors.password = "Wrong Password";
            res.status(404).json(errors);
          } else {
            // generating a token and storing it in a cookie
            const token = jwt.sign(
              { _id: user._id, role: user.role },
              "sooraj_DOING_GOOD",
              {
                expiresIn: "8h",
              }
            );

            const data = {
              id: user._id,
            };

            // console.log(data);
            // res.cookie("Authorization", token, options);
            res.status(201).json({
              token,
              role: user.role,
            });
          }
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  verifyToken: async (req, res) => {
    try {
      const token = req.body.token;
      const decoded = jwt.verify(token, "sooraj_DOING_GOOD");
      res.status(200).json(decoded);
    } catch (error) {
      return res.status(401).json({
        message: "Auth Failed",
      });
    }
  },

  getUser: async (req, res) => {
    const id = req.params.id;
    try {
      const userdata = await User.findById(id);
      const data = {
        firstName: userdata.firstName,
        LastName: userdata.lastName,
        email: userdata.email,
        role: userdata.role,
        PumpId: userdata.PumpId,
      };
      res.status(200).json(data);
    } catch (error) { }
  },
  getColab: async (req, res) => {
    const id = req.params.id;
    try {
      const data = await User.find({ PumpId: id });
      const sent = data.map((userdata) => {
        return {
          firstName: userdata.firstName,
          LastName: userdata.lastName,
          email: userdata.email,
          role: userdata.role,
          PumpId: userdata.PumpId,
          id: userdata._id,
        };
      });

      res.status(200).json(sent);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  deleteColab: async (req, res) => {
    const id = req.params.id;
    try {
      await User.findByIdAndDelete(id);
      res.status(200).json("success");
    } catch (err) {
      res.status(400).json({ err });
    }
  },
};
