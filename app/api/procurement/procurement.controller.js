const db = require("../../db");

exports.addProcurement = async (req, res) => {
  try {
    const { title, description, status, deadline, vendorIds } = req.body;
    const Procurement = await db.collection("Procurement").doc();
    const procurementId = Procurement.id;
    await Procurement.create({
      title: title,
      description: description,
      status: status,
      deadline: deadline,
      vendorIds: vendorIds
    });
    return res.status(201).send({
      msg: "Success",
      data: {
        id: procurementId,
        title: title,
        description: description,
        status: status,
        deadline: deadline,
        vendorIds: vendorIds
      },
    });
  } catch (err) {
    res.status(400).send({
      msg: "Filed To Create a Procurement Data",
      err: err.message
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
          data: doc.data()
        }
        response.push(procurementData)
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

exports.findProcurement = async (req, res) => {
    try {
      const procurementId = req.params.id;
      const procurementDoc = db.collection("Procurement").doc(procurementId);
      let procurementData = await procurementDoc.get();
      let response = procurementData.data();
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

exports.updateProcurement = async (req, res) => {
    try {
      const id = req.params.id;
      const { title, description, status, deadline, vendorIds } = req.body;
      const Procurement = db.collection("Procurement").doc(id);
      await Procurement.update({
        title: title,
        description: description,
        status: status,
        deadline: deadline,
        vendorIds: vendorIds
      })
      res.status(200).send({
        msg: "Data have been successfully Updated",
        data: {
            id: id,
            title: title,
            description: description,
            status: status,
            deadline: deadline,
            vendorIds: vendorIds
        }
      })
    } catch (err) {
      res.status(400).send({
        msg: "Failed to Update",
        err: err,
      });
    }
}

exports.deleteProcurement = async (req, res) => {
    try {
      const id = req.params.id;
      const Procurement = db.collection("Procurement").doc(id);
      await Procurement.delete();
      res.status(200).send({
        msg: "Procurement Data have been Successfully Deleted"
      })
    } catch (err) {
      res.status(400).send({
        msg: "Failed to Delete Procurement Data",
        err: err,
      });
    }
}