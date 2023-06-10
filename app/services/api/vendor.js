const db = require("../../db");
const { storage } = require("../../config");
const { getDownloadURL, uploadBytesResumable, ref, deleteObject } = require("firebase/storage");

// Add Vendor 
exports.addVendorService = async (req) => {
  const { bidId, institute, address, npwp } = req.body;
  const date = Date.now();
  const storageRef = ref(storage, `profilePictures/${req.file.originalname} - ${date}`);
  const storageRefFilePortfolio = ref(storage, `filePortfolio/${req.file.originalname} - ${date}`);
  const metadata = { contentType: req.file.mimetype };
  const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
  const snapshotPortfolio = await uploadBytesResumable(storageRefFilePortfolio, req.file.buffer, metadata);
  const downloadUrl = await getDownloadURL(snapshot.ref);
  const downloadUrlPortfolio = await getDownloadURL(snapshotPortfolio.ref);
  const Vendor = db.collection("Vendor").doc();
  const vendorId = Vendor.id;
  await Vendor.create({
    bidId,
    institute,
    address,
    npwp,
    ProfilePicture: downloadUrl,
    filePortfolio: downloadUrlPortfolio
  });
  return [{ vendorId, procurementId, institute, address, npwp, downloadUrl, downloadUrlPortfolio }];
}
// Get all Vendor 
exports.getVendorServices = async (req) => {
  const Vendor = db.collection("Vendor");
  const response = [];
  const data = await Vendor.get();
  data.docs.forEach((doc) => {
    response.push({
      id: doc.id,
      data: doc.data()
    });
  });
  if (response.length === 0) {
    return "Not Found"
  } else {
    return response;
  }
}
// Find Vendor By Id 
exports.findVendorServices = async (req) => {
  const vendorId = req.params.id;
  const vendorDoc = db.collection("Vendor").doc(vendorId);
  const Vendor = await vendorDoc.get();
  const response = Vendor.data();
  return response
}
// Update Vendor 
exports.updateVendorServices = async (req) => {
  const id = req.params.id;
  const { institute, address } = req.body;
  const vendorDoc = db.collection("Vendor").doc(id);
  const vendor = await vendorDoc.get();
  const response = vendor.data();
  await vendorDoc.update({
    bidId: response.bidId,
    ProfilePicture: response.ProfilePicture,
    filePortfolio: response.filePortfolio,
    institute,
    address
  })
  return [{
    bidId: response.bidId,
    ProfilePicture: response.ProfilePicture,
    filePortfolio: response.filePortfolio,
    institute,
    address
  }]
}
// Delete Vendor 
exports.deleteVendorServices = async (req) => {
  const id = req.params.id;
  const vendorDoc = db.collection("Vendor").doc(id);
  const Vendor = await vendorDoc.get();
  const data = Vendor.data();
  if (!data) {
    return "Not Found"
  } else {
    const fileUrl = data.ProfilePicture;
    const fileUrlPortfolio = data.filePortfolio;
    const storageRefProposal = ref(storage, fileUrl);
    const storageRefProposalPortfolio = ref(storage, fileUrlPortfolio);
    await deleteObject(storageRefProposal);
    await deleteObject(storageRefProposalPortfolio);
    await vendorDoc.delete();
    return data
  }
}
