const signUp = require("../../services/auth/signup")
const signIn = require("../../services/auth/signin")

const signupUser = async (req, res) => {
  try {
    const result = await signUp(req)
    const Check = result === "USER ALREADY SIGNUP"
    if (Check) {
      res.status(400).send({
        msg: "User sign up failed",
        errorCatch: result
      })
    } else {
      res.status(201).send({
        msg: "User sign up successful",
        token: result
      })
    }
  } catch (error) {
    res.status(500).send({
      message: "INTERNAL SERVER ERROR"
    })
  }
}

const signInUser = async (req, res) => {
  try {
    const data = await signIn(req);
    if (data === "USER NOT FOUND") {
      res.status(404).send({
        message: "Cant Find User Check Your Credentials"
      })
    } else if (data === "CREDENTIALS IS NOT VALID") {
      res.status(400).send({
        message: "Cant Login Check Your Credentials"
      })
    } else {
      res.status(200).header('Authorization', `Bearer ${data}`).send({
        token: data
      })
    }
  } catch (error) {
    res.status(500).send({
      message: "INTERNAL SERVER ERROR"
    })
  }
}

module.exports = { signupUser, signInUser };