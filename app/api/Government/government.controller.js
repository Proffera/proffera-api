const db = require("../../db");

exports.addGovernment = async (req, res) => {
  try {
    const { procurementId, institute, address, profilePictures } = req.body;
    const Government = await db.collection("Government").doc();
    const governmentId = Government.id;
    await Government.create({
        procurementId: procurementId,
        institute: institute,
        address: address,
        profilePictures: profilePictures,
    });
    return res.status(201).send({
      msg: "Success",
      data: {
        id: governmentId,
        procurementId: procurementId,
        institute: institute,
        address: address,
        profilePictures: profilePictures,
      },
    });
  } catch (err) {
    res.status(400).send({
      msg: "Filed To Create a Government Data",
      err: err.message
    });
  }
};

exports.getAllGovernment = async (req, res) => {
    try {
      const Government = db.collection("Government");
      const response = [];
      const data = await Government.get();
      const docs = data.docs;
      docs.forEach((doc) => {
        const governmentData = {
          id: doc.id,
          data: doc.data()
        }
        response.push(governmentData)
      })
      res.status(200).send({
        msg: "Success fetching data",
        data: response,
      });
    } catch (err) {
      res.status(400).send({
        msg: "Failed to fetch data",
        err: err,
      });
    }
}

exports.findGovernment = async (req, res) => {
    try {
      const governmentId = req.params.id;
      const governmentDoc = db.collection("Government").doc(governmentId);
      let governmentData = await governmentDoc.get();
      let response = governmentData.data();
      res.status(200).send({
        msg: "Data Found",
        data: response
      })
    } catch (err) {
      res.status(400).send({
        msg: "Failed to fetch data",
        err: err,
      });
    }
}

exports.updateGovernment = async (req, res) => {
    try {
      const id = req.params.id;
      const { procurementId, institute, address, profilePictures } = req.body;
      const Government = db.collection("Government").doc(id);
      await Government.update({
        procurementId: procurementId,
        institute: institute,
        address: address,
        profilePictures: profilePictures,
      })
      res.status(200).send({
        msg: "Data have been successfully Updated",
        data: {
            id: id,
            procurementId: procurementId,
            institute: institute,
            address: address,
            profilePictures: profilePictures,
        }
      })
    } catch (err) {
      res.status(400).send({
        msg: "Failed to Update",
        err: err,
      });
    }
}

exports.deleteGovernment = async (req, res) => {
    try {
      const id = req.params.id;
      const Government = db.collection("Government").doc(id);
      await Government.delete();
      res.status(200).send({
        msg: "Government Data have been Successfully Deleted"
      })
    } catch (err) {
      res.status(400).send({
        msg: "Failed to Delete Government Data",
        err: err,
      });
    }
}