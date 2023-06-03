const db = require("../../db");

const signUp = async (req, res) => {
    const {email, password} = req.body

    try{
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const { uid } = userCredential.user;

        const expiresIn = 3 * 24 * 60 * 60 * 1000
        await authAdmin.createCustomToken(uid, { expiresIn })

        await db.collection("User").doc(uid).set({
            role: "Government"
        });

        await userCredential.user.getIdToken().then((Token) => {
            authAdmin.verifyIdToken(Token).then((decodenToken) => {
                const expiredDate = new Date(decodenToken.exp * 1000);
                res.status(201).send({
                    msg: "User Successful Created",
                    idToken : Token,
                    tokenWasExpiredIn: expiredDate
                })
            }).catch((error) => {
                res.status(400).send({
                    msg: "signup failed",
                    error: error.message
                })
            });
        }).catch((error) => {
            res.status(400).send({
                msg: "signup failed",
                error: error.message
            })
        });
    }
    catch( error ){
        res.status(400).send({
            msg: "Signup Failed",
            error: error.message
        })
    }
}