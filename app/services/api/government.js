const db = require("../../db");
const { storage, auth } = require("../../config");
const {
  getDownloadURL,
  uploadBytesResumable,
  ref,
  deleteObject,
} = require("firebase/storage");
const { updateProfile, deleteUser, signOut } = require("firebase/auth");

// Get all Government
exports.getGovernmentServices = async (req) => {
  const Government = db.collection("Government");
  const response = [];
  const data = await Government.get();
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
// Find Government By Id
exports.findGovernmentServices = async (req) => {
  const governmentId = req.params.id;
  const governmentDoc = db.collection("Government").doc(governmentId);
  const government = await governmentDoc.get();
  const response = government.data();
  return response;
};
// Update Government
exports.updateGovernmentServices = async (req) => {
  const id = auth.currentUser.uid;
  const storageRef = ref(
    storage,
    `profileImage/${req.file.originalname}-${Date.now()}`
  );
  const metadata = { contentType: req.file.mimetype };
  const snapshot = await uploadBytesResumable(
    storageRef,
    req.file.buffer,
    metadata
  );
  const downloadUrl = await getDownloadURL(snapshot.ref);
  const { lkpd, lpse, satker, address } = req.body;
  const GovernmentDoc = db.collection("Government").doc(id);
  const government = await GovernmentDoc.get();
  const response = government.data();
  await updateProfile(auth.currentUser, {
    photoURL: downloadUrl,
  });
  await GovernmentDoc.update({
    createdAt: response.createdAt,
    address: address,
    lkpd: lkpd,
    lpse: lpse,
    satker: satker,
    email: auth.currentUser.email,
    photoURL: auth.currentUser.photoURL,
    updatedAt: new Date().toISOString(),
  });
  return [
    {
      createdAt: response.createdAt,
      address: address,
      lkpd: lkpd,
      lpse: lpse,
      satker: satker,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
      updatedAt: new Date().toISOString(),
    },
  ];
};
// Delete Government
exports.deleteGovernmentServices = async (req) => {
  const id = auth.currentUser.uid;
  const user = auth.currentUser;
  const governmentDoc = db.collection("Government").doc(id);
  const government = await governmentDoc.get();
  const data = government.data();
  const fileUrl = data.photoURL;
  const storageRefPhotoProfile = ref(storage, fileUrl);
  if (!data) {
    return "Not Found";
  } else if (fileUrl) {
    console.log("ADA GAMBAR");
    await deleteObject(storageRefPhotoProfile);
    await governmentDoc.delete();
    await deleteUser(user).then(() => {
      signOut(auth);
      return "User Deleted";
    });
  } else {
    await governmentDoc.delete();
    await deleteUser(user).then(() => {
      signOut(auth);
      return "User Deleted";
    });
  }
};
