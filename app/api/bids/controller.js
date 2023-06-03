const db = require("../../db");

const addBids = async (req, res) => {
  try {
    const { procurementId, vendorId, contractAmount, proposalFiles, biddingStatus } = req.body;
    const bidRef = await db.collection("Bids").doc();
    const bidId = bidRef.id;
    await bidRef.create({
      procurementId: procurementId,
      vendorId: vendorId,
      contractAmount: contractAmount,
      proposalFiles: proposalFiles,
      biddingStatus: biddingStatus,
    });
    return res.status(201).send({
      msg: "Success",
      data: {
        id: bidId,
        procurementId: procurementId,
        vendorId: vendorId,
        contractAmount: contractAmount,
        proposalFiles: proposalFiles,
        biddingStatus: biddingStatus,
      },
    });
  } catch (err) {
    res.status(400).send({
      msg: "Filed adding data",
      err: err.message
    });
  }
};

const getBids = async (req, res) => {
  try {
    const bids = db.collection("Bids");
    const response = [];
    const data = await bids.get();
    const docs = data.docs;
    docs.forEach((doc) => {
      const selectedItemBids = {
        id: doc.id,
        data: doc.data()
      }
      response.push(selectedItemBids)
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

const findBids = async (req, res) => {
  try {
    const bidId = req.params.id;
    const bidDoc = db.collection("Bids").doc(bidId);
    let bid = await bidDoc.get();
    let response = bid.data();
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
const updateBids = async (req, res) => {
  try {
    const id = req.params.id;
    const { procurementId, vendorId, contractAmount, proposalFiles, biddingStatus } = req.body;
    const bidDoc = db.collection("Bids").doc(id);
    await bidDoc.update({
      procurementId: procurementId,
      vendorId: vendorId,
      contractAmount: contractAmount,
      proposalFiles: proposalFiles,
      biddingStatus: biddingStatus,
    })
    res.status(200).send({
      msg: "Data Updated",
      data: {
        id: id,
        procurementId: procurementId,
        vendorId: vendorId,
        contractAmount: contractAmount,
        proposalFiles: proposalFiles,
        biddingStatus: biddingStatus,
      }
    })
  } catch (err) {
    res.status(400).send({
      msg: "Failed to Update",
      err: err,
    });
  }
}

const deleteBids = async (req, res) => {
  try {
    const id = req.params.id;
    const bidDoc = db.collection("Bids").doc(id);
    await bidDoc.delete();
    res.status(200).send({
      msg: "Success Deleted"
    })
  } catch (err) {
    res.status(400).send({
      msg: "Failed to Delete",
      err: err,
    });
  }
}

module.exports = {
  addBids,
  getBids,
  findBids,
  updateBids,
  deleteBids
};
