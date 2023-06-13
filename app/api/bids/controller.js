const {
  addBidsService,
  getBidsServices,
  findBidsServices,
  updateBidsServices,
  deleteBidsServices,
} = require("../../services/api/bids");

const addBids = async (req, res, next) => {
  try {
    const data = await addBidsService(req);
    res.status(201).send({
      message: "Succesful create a new Bidding",
      data,
    });
  } catch (err) {
    res.status(400).send({ msg: "Filed adding data", err: err.message });
    next(err);
  }
};

const getBids = async (req, res, next) => {
  try {
    const data = await getBidsServices();
    if (data === "Not Found") {
      const error = res.status(200).send({
        message: "Empty Bids",
      });
      return error;
    }
    res.status(200).send({
      message: "Success fetching data",
      data,
    });
  } catch (err) {
    res.status(400).send({ msg: "Failed to fetch data", err });
    next(err);
  }
};

const findBids = async (req, res, next) => {
  try {
    const data = await findBidsServices(req);
    res.status(200).send({ msg: "Data Found", data });
  } catch (err) {
    res.status(400).send({ msg: "Failed to fetch data", err });
    next(err);
  }
};

const updateBids = async (req, res, next) => {
  try {
    const data = await updateBidsServices(req);
    res.status(200).send({ msg: "Data Updated", data });
  } catch (err) {
    res.status(400).send({ msg: "Failed to Update", err: err.message });
    next(err);
  }
};

module.exports = {
  addBids,
  getBids,
  findBids,
  updateBids,
};
