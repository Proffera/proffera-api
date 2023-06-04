const db = require("../../db");
const config = require("../../config");
const { initializeApp } = require("firebase/app")
const { getStorage, getDownloadURL, uploadBytesResumable, ref, deleteObject } = require("firebase/storage");

// initializeApp Firebase Client
initializeApp(config.firebaseConfig);

const storage = getStorage();

// Add Government 
exports.addGovernmentService = async (req) => {
  const { procurementId, institute, address } = req.body;
  const date = Date.now();
  const storageRef = ref(storage, `profilePictures/${req.file.originalname} - ${date}`);
  const metadata = { contentType: req.file.mimetype };
  const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
  const downloadUrl = await getDownloadURL(snapshot.ref);
  const Government = db.collection("Government").doc();
  const governmentId = Government.id;
  await Government.create({
    procurementId,
    institute,
    address,
    ProfilePicture: downloadUrl,
  });
  return [{governmentId, procurementId, institute, address, downloadUrl }];
}
// Get all Government 
exports.getGovernmentServices = async (req) => {
  const Government = db.collection("Government");
  const response = [];
  const data = await Government.get();
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
// Find Government By Id 
exports.findGovernmentServices = async (req) => {
  const governmentId = req.params.id;
  const governmentDoc = db.collection("Government").doc(governmentId);
  const government = await governmentDoc.get();
  const response = government.data();
  return response
}
// Update Government 
exports.updateGovernmentServices = async (req) => {
  const id = req.params.id;
  const { institute, address } = req.body;
  const GovernmentDoc = db.collection("Government").doc(id);
  const government = await GovernmentDoc.get();
  const response = government.data();
  await GovernmentDoc.update({ 
    procurementId: response.procurementId, 
    ProfilePicture: response.ProfilePicture, 
    institute, 
    address 
})
  return [{
    procurementId: response.procurementId,
    ProfilePicture: response.ProfilePicture,
    institute,
    address
  }]
}
// Delete Government 
exports.deleteGovernmentServices = async (req) => {
  const id = req.params.id;
  const governmentDoc = db.collection("Government").doc(id);
  const government = await governmentDoc.get();
  const data = government.data();
  if (!data) {
    return "Not Found"
  } else {
    const fileUrl = data.ProfilePicture;
    const storageRefProposal = ref(storage, fileUrl);
    await deleteObject(storageRefProposal);
    await governmentDoc.delete();
    return data
  }
}
