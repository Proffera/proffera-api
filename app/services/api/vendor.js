const db = require("../../db");
const { storage, auth } = require("../../config");
const {
  getDownloadURL,
  uploadBytesResumable,
  ref,
  deleteObject,
} = require("firebase/storage");
const { updateProfile, deleteUser, signOut } = require("firebase/auth");
const { firestore } = require("firebase-admin");

// Get all Vendor
exports.getVendorServices = async (req) => {
  const Vendor = db.collection("Vendor");
  const response = [];
  const data = await Vendor.get();
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
// Find Vendor By Id
exports.findVendorServices = async (req) => {
  const vendorId = req.params.id;
  const vendorDoc = db.collection("Vendor").doc(vendorId);
  const Vendor = await vendorDoc.get();
  const response = Vendor.data();
  return response;
};
// Update Vendor
exports.updateVendorServices = async (req) => {
  const id = auth.currentUser.uid;
  // Request Body
  const { institute, address, npwp } = req.body;
  // Request File
  // Profile Images
  const storageRefProfileImage = ref(
    storage,
    `profileImage/${req.files.profileImage[0].originalname} - ${Date.now()}`
  );
  // Portofolio Vendor
  const storageRefFilePortfolio = ref(
    storage,
    `filePortfolio/${req.files.filePortfolio[0].originalname} - ${Date.now()}`
  );
  // Metadata
  const metadataProfile = { contentType: req.files.profileImage[0].mimetype };
  const metadataFilePortofolio = {
    contentType: req.files.filePortfolio[0].mimetype,
  };
  // Snapshoot
  const snapshotProfileImage = await uploadBytesResumable(
    storageRefProfileImage,
    req.files.profileImage[0].buffer,
    metadataProfile
  );
  const snapshotPortfolio = await uploadBytesResumable(
    storageRefFilePortfolio,
    req.files.filePortfolio[0].buffer,
    metadataFilePortofolio
  );
  // Get URL Image or Portfolio
  const downloadUrl = await getDownloadURL(snapshotProfileImage.ref);
  const downloadUrlPortfolio = await getDownloadURL(snapshotPortfolio.ref);
  const vendorDoc = db.collection("Vendor").doc(id);
  await updateProfile(auth.currentUser, {
    photoURL: downloadUrl,
  });
  const vendor = await vendorDoc.get();
  const response = vendor.data();
  await vendorDoc.update({
    createdAt: response.createdAt,
    address: address,
    npwp: npwp,
    institute: institute,
    email: response.email,
    photoURL: auth.currentUser.photoURL,
    portofolio: firestore.FieldValue.arrayUnion(downloadUrlPortfolio),
    updatedAt: new Date().toISOString(),
  });
  return [
    {
      createdAt: response.createdAt,
      address: address,
      npwp: npwp,
      institute: institute,
      email: response.email,
      photoURL: auth.currentUser.photoURL,
      portofolio: firestore.FieldValue.arrayUnion(downloadUrlPortfolio),
      updatedAt: new Date().toISOString(),
    },
  ];
};
// Delete Vendor
exports.deleteVendorServices = async (req) => {
  const id = auth.currentUser.uid;
  const user = auth.currentUser;
  const vendorDoc = db.collection("Vendor").doc(id);
  const Vendor = await vendorDoc.get();
  const data = Vendor.data();
  const fileUrl = data.photoURL;
  const fileUrlPortfolio = data.portofolio;
  const storageRefProfileImage = ref(storage, fileUrl);
  const storageRefFilePortfolio = ref(storage, fileUrlPortfolio);
  if (!data) {
    return "Not Found";
  } else if (fileUrl) {
    await deleteObject(storageRefProfileImage);
    await deleteObject(storageRefFilePortfolio);
    await vendorDoc.delete();
    await deleteUser(user).then(() => {
      signOut(auth);
      return "User Deleted";
    });
  } else {
    await deleteObject(storageRefFilePortfolio);
    await vendorDoc.delete();
    await deleteUser(user).then(() => {
      signOut(auth);
      return "User Deleted";
    });
  }
};
