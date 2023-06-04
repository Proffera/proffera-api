const { addGovernmentService, 
        getGovernmentServices, 
        findGovernmentServices, 
        updateGovernmentServices, 
        deleteGovernmentServices 
    } = require("../../services/api/government");

exports.addGovernment = async (req, res, next) => {
  try {
    const data = await addGovernmentService(req);
    res.status(201).send({
      message: "Succesful create a new Government",
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

exports.getAllGovernment = async (req, res, next) => {
  try {
    const data = await getGovernmentServices();
    if (data === "Not Found") {
      const error = res.status(200).send({
        message: "Government Data Not Found"
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

exports.findGovernment = async (req, res, next) => {
  try {
    const data = await findGovernmentServices(req)
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

exports.updateGovernment = async (req, res, next) => {
  try {
    const data = await updateGovernmentServices(req);
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

exports.deleteGovernment = async (req, res, next) => {
  try {
    const data = await deleteGovernmentServices(req)
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
