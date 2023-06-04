const { addVendorService, 
        getVendorServices, 
        findVendorServices, 
        updateVendorServices, 
        deleteVendorServices 
    } = require("../../services/api/vendor");

exports.addVendor = async (req, res, next) => {
  try {
    const data = await addVendorService(req);
    res.status(201).send({
      message: "Succesful create a new Vendor",
      data
    })
  } catch (err) {
    res.status(400).send({ 
        msg: "Filed adding data", 
        err: err.message 
    });
    next(err)
  }
};

exports.getAllVendor = async (req, res, next) => {
  try {
    const data = await getVendorServices();
    if (data === "Not Found") {
      const error = res.status(200).send({
        message: "Vendor Data Not Found"
      })
      return error
    }
    res.status(200).send({
      message: "Success fetching data",
      data
    });
  } catch (err) {
    res.status(400).send({ 
        msg: "Failed to fetch data", 
        err 
    });
    next(err);
  }
};

exports.findVendor = async (req, res, next) => {
  try {
    const data = await findVendorServices(req)
    res.status(200).send({
         msg: "Data Found", 
         data 
        });
  } catch (err) {
    res.status(400).send({ 
        msg: "Failed to fetch data", 
        err 
    });
    next(err)
  }
};

exports.updateVendor = async (req, res, next) => {
  try {
    const data = await updateVendorServices(req);
    res.status(200).send({ 
        msg: "Data Updated", 
        data 
    });
  } catch (err) {
    res.status(400).send({ 
        msg: "Failed to Update", 
        err: err.message 
    });
    next(err)
  }
};

exports.deleteVendor = async (req, res, next) => {
  try {
    const data = await deleteVendorServices(req)
    if (data === "Not Found") {
      const error = res.status(404).send({
        message: "Delete Data Failed",
        error: "ID NOT FOUND"
      })
      return error
    }
    res.status(200).send({
      msg: "Success Deleted Data",
      data
    });
  } catch (err) {
    res.status(400).send({ 
        msg: "Failed to Delete", 
        err 
    });
    next(err);
  }
};
