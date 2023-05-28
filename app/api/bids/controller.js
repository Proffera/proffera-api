const db = require("../../db");

const addBids = async (req, res) => {
  try {
    const { procurementId, vendorId, amount, status } = req.body;
    const bidRef = await db.collection("Bids").doc();
    const bidId = bidRef.id();
    await bidRef.create({
      procurementId: procurementId,
      vendorId: vendorId,
      amount: amount,
      status: status,
    });
    return res.status(201).send({
      msg: "Success",
      data: {
        id: bidId,
        procurementId: procurementId,
        vendorId: vendorId,
        amount: amount,
        status: status,
      },
    });
  } catch (err) {
    res.status(400).send({
      msg: "Filed adding data",
    });
  }
};

module.exports = addBids;
