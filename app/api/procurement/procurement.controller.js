const { firestore } = require("firebase-admin");
const db = require("../../db");
const { auth } = require("../../config");

exports.addProcurement = async (req, res) => {
  try {
    const { name, description, workingAddress } = req.body;
    const governmentId = auth.currentUser.uid;
    const Procurement = db.collection("Procurement").doc();
    const procurementId = Procurement.id;
    // Update Government ProcurementId
    const GovernmentDoc = db.collection("Government").doc(governmentId);
    await GovernmentDoc.get();
    await GovernmentDoc.update({
      procurementId: firestore.FieldValue.arrayUnion(procurementId),
      updatedAt: new Date().toISOString(),
    });
    // Create a New Procurement
    await Procurement.create({
      governmentId: governmentId,
      name: name,
      description: description,
      workingAddress: workingAddress,
    });
    return res.status(201).send({
      msg: "Success",
      data: {
        id: procurementId,
        governmentId: governmentId,
        name: name,
        description: description,
        workingAddress: workingAddress,
      },
    });
  } catch (err) {
    res.status(400).send({
      msg: "Filed To Create a Procurement Data",
      err: err.message,
    });
  }
};

exports.getAllProcurement = async (req, res) => {
  try {
    const Procurement = db.collection("Procurement");
    const response = [];
    const data = await Procurement.get();
    const docs = data.docs;
    docs.forEach((doc) => {
      const procurementData = {
        id: doc.id,
        data: doc.data(),
      };
      response.push(procurementData);
    });
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
};

exports.findProcurement = async (req, res) => {
  try {
    const procurementId = req.params.id;
    const procurementDoc = db.collection("Procurement").doc(procurementId);
    let procurementData = await procurementDoc.get();
    let response = procurementData.data();
    res.status(200).send({
      msg: "Data Found",
      data: response,
    });
  } catch (err) {
    res.status(400).send({
      msg: "Failed to fetch data",
      err: err,
    });
  }
};

exports.updateProcurement = async (req, res) => {
  try {
    const id = req.params.id;
    const uid = auth.currentUser.uid
    const { name, description, workingAddress } = req.body;
    const Procurement = db.collection("Procurement").doc(id);
    await Procurement.update({
      governmentId: uid,
      name: name,
      description: description,
      workingAddress: workingAddress,
    });
    res.status(200).send({
      msg: "Data have been successfully Updated",
      data: {
        id: id,
        governmentId: uid,
        name: name,
        description: description,
        workingAddress: workingAddress,
      },
    });
  } catch (err) {
    res.status(400).send({
      msg: "Failed to Update",
      err: err,
    });
  }
};

exports.deleteProcurement = async (req, res) => {
  try {
    const id = req.params.id;
    const Procurement = db.collection("Procurement").doc(id);
    await Procurement.delete();
    res.status(200).send({
      msg: "Procurement Data have been Successfully Deleted",
    });
  } catch (err) {
    res.status(400).send({
      msg: "Failed to Delete Procurement Data",
      err: err,
    });
  }
};
