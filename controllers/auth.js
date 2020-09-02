const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const keys = require("../config/keys");
const errorHandler = require("../utils/errorHandler");

module.exports.login = async function (req, res) {
  const candidate = await User.findOne({
    email: req.body.email,
  });
  if (candidate) {
    console.log(candidate);
    // Если он есть,то проверяем пароль
    const passwordResult = bcrypt.compareSync(
      req.body.password,
      candidate.password
    );
    if (passwordResult) {
      // Пароли совпали с бд, генерим токен
      const token = jwt.sign(
        {
          email: candidate.email,
          userId: candidate._id,
        },
        keys.jwt,
        {
          expiresIn: 60 * 60,
        }
      ); // expiresIn - время существования токена, после нужно делать новый | keys.jwt - строка, на основе, которой все будет генериться
      res.status(200).json({
        token: `Bearer ${token}`,
        // token
      });
    } else {
      // Пароли не совпали, 401 неавторизирован
      res.status(401).json({
        message: "incorrect password, try again",
      });
    }
  } else {
    // Пользователя нет
    res.status(404).json({
      message: "No such user",
    });
  }
  // res.json({
  //     login: {
  //         email: req.body.email,
  //         password: req.body.password
  //     }
  // })
};
module.exports.register = async function (req, res) {
  const candidate = await User.findOne({
    email: req.body.email, // нашли или нет
  });
  if (candidate) {
    // Пользователь существует
    console.log("error");
    res.status(409).json({
      message: "User already exist",
    });
  } else {
    const salt = bcrypt.genSaltSync(10);
    const password = req.body.password;
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(password, salt), // шифруем пароли
    });
    try {
      await user.save();
      res.status(201).json({
        user,
        message: "User was created (succes)",
      });
    } catch (e) {
      // console.log("Создание пользователя в базе с ошибкой:", e)
      errorHandler(res, e);
    }
  }

  // user.save().then(() => console.log("user created"))
};
