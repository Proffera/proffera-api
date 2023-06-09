const signUp = require("../../services/auth/signup");
const signIn = require("../../services/auth/signin");
const { signOut } = require("firebase/auth");
const { auth } = require("../../config");

const signupUser = async (req, res) => {
  try {
    const result = await signUp(req);
    const UserAlreadySignUp = result === "USER ALREADY SIGNUP";
    const PasswordWeak = result === "PASSWORD TO WEAK";
    if (UserAlreadySignUp) {
      res.status(400).send({
        msg: "User sign up failed",
        errorCatch: result,
      });
    } else if (PasswordWeak) {
      res.status(400).send({
        msg: "User sign up failed",
        errorCatch: result,
      });
    } else {
      res.status(201).send({
        msg: "User sign up successful",
        token: result,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "INTERNAL SERVER ERROR",
    });
  }
};

const signInUser = async (req, res) => {
  try {
    const data = await signIn(req);
    if (data === "USER NOT FOUND") {
      res.status(404).send({
        message: "Cant Find User Check Your Credentials",
      });
    } else if (data === "CREDENTIALS IS NOT VALID") {
      res.status(400).send({
        message: "Cant Login Check Your Credentials",
      });
    } else if (data === "TOKEN WAS EXPIRED") {
      res.status(400).send({
        message: "Token Was Expired Please Login Again",
      });
    } else {
      res.status(200).header("Authorization", `Bearer ${data}`).send({
        token: data,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "INTERNAL SERVER ERROR",
    });
  }
};

const logout = (req, res) => {
  try {
    if (auth.currentUser === null) {
      res.status(400).send({
        msg: "GO TO LOGIN FIRST",
      });
    } else {
      signOut(auth).then(() => {
        res.status(200).send({
          msg: "LogoutSuccess",
        });
      });
    }
  } catch (error) {
    res.status(500).send({
      msg: "INTERNAL SERVER ERROR",
      errorCode: error.code,
    });
  }
};

module.exports = { signupUser, signInUser, logout };
