const db = require("../../db");

exports.addVendor = async (req, res) => {
  try {
    const { bidId, institute, address, npwp, profilePictures, filePortfolio } = req.body;
    const Vendor = await db.collection("Vendor").doc();
    const vendorId = Vendor.id;
    await Vendor.create({
        bidId: bidId,
        institute: institute,
        address: address,
        npwp: npwp,
        profilePictures: profilePictures,
        filePortfolio: filePortfolio
    });
    return res.status(201).send({
      msg: "Success",
      data: {
        id: vendorId,
        bidId: bidId,
        institute: institute,
        address: address,
        npwp: npwp,
        profilePictures: profilePictures,
        filePortfolio: filePortfolio
      },
    });
  } catch (err) {
    res.status(400).send({
      msg: "Filed To Create a Vendor Data",
      err: err.message
    });
  }
};

exports.getAllVendor = async (req, res) => {
    try {
      const Vendor = db.collection("Vendor");
      const response = [];
      const data = await Vendor.get();
      const docs = data.docs;
      docs.forEach((doc) => {
        const vendorData = {
          id: doc.id,
          data: doc.data()
        }
        response.push(vendorData)
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

exports.findVendor = async (req, res) => {
    try {
      const vendorId = req.params.id;
      const vendorDoc = db.collection("Vendor").doc(vendorId);
      let vendorData = await vendorDoc.get();
      let response = vendorData.data();
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

exports.updateVendor = async (req, res) => {
    try {
      const id = req.params.id;
      const { bidId, institute, address, npwp, profilePictures, filePortfolio } = req.body;
      const Vendor = db.collection("Vendor").doc(id);
      await Vendor.update({
        bidId: bidId,
        institute: institute,
        address: address,
        npwp: npwp,
        profilePictures: profilePictures,
        filePortfolio: filePortfolio
      })
      res.status(200).send({
        msg: "Data have been successfully Updated",
        data: {
            id: id,
            bidId: bidId,
            institute: institute,
            address: address,
            npwp: npwp,
            profilePictures: profilePictures,
            filePortfolio: filePortfolio
        }
      })
    } catch (err) {
      res.status(400).send({
        msg: "Failed to Update",
        err: err,
      });
    }
}

exports.deleteVendor = async (req, res) => {
    try {
      const id = req.params.id;
      const Vendor = db.collection("Vendor").doc(id);
      await Vendor.delete();
      res.status(200).send({
        msg: "Vendor Data have been Successfully Deleted"
      })
    } catch (err) {
      res.status(400).send({
        msg: "Failed to Delete Vendor Data",
        err: err,
      });
    }
}