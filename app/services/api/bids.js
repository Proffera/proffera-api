const db = require("../../db");
const { storage, auth } = require("../../config");
const {
  getDownloadURL,
  uploadBytesResumable,
  ref,
  deleteObject,
} = require("firebase/storage");
const { firestore } = require("firebase-admin");

// Add Bids Services
const addBidsService = async (req) => {
  const { procurementId, contractAmount, biddingStatus } = req.body;
  const vendorId = auth.currentUser.uid;
  const dateTime = Date.now();
  const storageRef = ref(
    storage,
    `fileProposal/${req.file.originalname} - ${dateTime}`
  );
  const metadata = { contentType: req.file.mimetype };
  const snapshot = await uploadBytesResumable(
    storageRef,
    req.file.buffer,
    metadata
  );
  const downloadUrl = await getDownloadURL(snapshot.ref);
  const bidRef = db.collection("Bids").doc();
  const bidId = bidRef.id;
  // Update Procurement ID Bidding
  const ProcurementDoc = db.collection("Procurement").doc(procurementId);
  await ProcurementDoc.get();
  await ProcurementDoc.update({
    bidId: firestore.FieldValue.arrayUnion(bidId),
    updatedAt: new Date().toISOString(),
  });
  // Update Vendor Bidding
  const VendorDoc = db.collection("Vendor").doc(vendorId);
  await VendorDoc.get();
  await VendorDoc.update({
    bidId: firestore.FieldValue.arrayUnion(bidId),
    updatedAt: new Date().toISOString(),
  });
  // Create a New Bidding
  await bidRef.create({
    procurementId,
    vendorId,
    contractAmount,
    fileProposal: downloadUrl,
    biddingStatus,
  });

  return [
    {
      bidId,
      procurementId,
      vendorId,
      contractAmount,
      biddingStatus,
      downloadUrl,
    },
  ];
};
// Get all bids Services
const getBidsServices = async (req) => {
  const bids = db.collection("Bids");
  const response = [];
  const data = await bids.get();
  data.docs.forEach((doc) => {
    response.push({
      id: doc.id,
      data: doc.data(),
    });
  });
  if (response.length === 0) {
    return "Not Found";
  } else {
    return response;
  }
};
// Find Bids By Id Services
const findBidsServices = async (req) => {
  const bidId = req.params.id;
  const bidDoc = db.collection("Bids").doc(bidId);
  const bid = await bidDoc.get();
  const response = bid.data();
  return response;
};
// Update Bids Services
const updateBidsServices = async (req) => {
  const id = req.params.id;
  const { contractAmount, biddingStatus } = req.body;
  const bidDoc = db.collection("Bids").doc(id);
  const bid = await bidDoc.get();
  const response = bid.data();
  await bidDoc.update({
    procurementId: response.procurementId,
    vendorId: response.vendorId,
    fileProposal: response.fileProposal,
    contractAmount,
    biddingStatus,
  });
  return [
    {
      procurementId: response.procurementId,
      vendorId: response.vendorId,
      fileProposal: response.fileProposal,
      contractAmount,
      biddingStatus,
    },
  ];
};
// Delete Bids Services
const deleteBidsServices = async (req) => {
  const id = req.params.id;
  // Find Id Bids
  const bidDoc = db.collection("Bids").doc(id);
  const bid = await bidDoc.get();
  const data = bid.data();
  if (!data) {
    return "Not Found";
  } else {
    const fileUrl = data.fileProposal;
    const storageRefProposal = ref(storage, fileUrl);
    await deleteObject(storageRefProposal);
    await bidDoc.delete();
    return data;
  }
};
module.exports = {
  addBidsService,
  getBidsServices,
  findBidsServices,
  updateBidsServices,
  deleteBidsServices,
};
