const Customer = require("../models/CustomerSchema");
const Pump = require("../models/PumpSchema");
module.exports = {
  createCustomer: async (req, res) => {
    const {
      Name,
      Address,
      MobileNo,
      GSTIN,
      OfficePhoneNo,
      EmailID,
      CreditBalance,
      CreditLimit,
      Note,
    } = req.body;

    try {
      let serialNumber = 1;
      try {
        const latestCustomer = await Customer.findOne({ PumpId: req.params.id })
          .sort({ createdAt: -1 })
          .limit(1);

        if (latestCustomer.serialNumber != undefined && latestCustomer) {
          serialNumber = latestCustomer.serialNumber + 1;
        }
        console.log(latestCustomer.serialNumber);
      } catch (err) {
        console.log("NO DATA");
      }

      const result = await Customer.create({
        Name,
        Address,
        MobileNo,
        GSTIN,
        OfficePhoneNo,
        EmailID,
        CreditBalance,
        CreditLimit,
        Note,
        serialNumber,
        PumpId: req.params.id,
      });
      try {
        await Pump.findByIdAndUpdate(req.params.id, {
          $push: {
            Customer: [
              {
                serialNumber: serialNumber,
                CustomerId: result._id,
                CustomerName: result.Name,
                MobileNo: result.MobileNo,
                CreditBalance: result.CreditBalance,
              },
            ],
          },
        });
        res.status(200).json(serialNumber);
      } catch (err) {
        res.status(401).json({ err });
      }
    } catch (err) {
      res.status(400).json({ err });
    }
  },

  getCustomer: async (req, res) => {
    const id = req.params.id;
    try {
      const result1 = await Customer.find();
      res.status(200).json({ result1 });
    } catch (err) {
      res.status(400).json({ err });
    }
  },
  getCustomerById: async (req, res) => {
    const id = req.params.id;
    try {
      const result2 = await Customer.findById(id);
      res.status(200).json({ result2 });
    } catch (err) {
      res.status(400).json({ err });
    }
  },
  updateCustomer: async (req, res) => {
    const id = req.params.id;
    const pumpid = req.params.pumpid;
    try {
      await Customer.findByIdAndUpdate(id, {
        Name: req.body.Name,
        Address: req.body.Address,
        MobileNo: req.body.MobileNo,
        GSTIN: req.body.GSTIN,
        OfficePhoneNo: req.body.OfficePhoneNo,
        EmailID: req.body.EmailID,
        CreditBalance: req.body.CreditBalance,
        CreditLimit: req.body.CreditLimit,
        Note: req.body.Note,
      });
      // res.status(200).json("success");
      try {
        const object = await Pump.findById(pumpid);
        if (!object) {
          return res.status(404).send("Object not found");
        } else {
          const nestedCustomer = object.Customer.find(
            (nestedObj) => nestedObj.CustomerId === id
          );
          if (!nestedCustomer) {
            return res.status(404).send("Nested object not found");
          }
          // Update the customer's data with the provided updatedCustomerData
          const updatedCustomerData = {
            CustomerName: req.body.Name,
            CustomerId: req.params.id,
            MobileNo: req.body.MobileNo,
            CreditBalance: req.body.CreditBalance,
          };
          Object.assign(nestedCustomer, updatedCustomerData);

          await object.save();

          res.send("Object updated successfully");
        }
      } catch (err) {
        res.status(400).json({ err });
      }
    } catch (err) {
      res.status(400).json({ err });
    }
  },
  deleteCustomer: async (req, res) => {
    const pumpId = req.params.pumpId;
    const customerId = req.params.customerId;
    try {
      const deletedCustomer = await Pump.findOneAndUpdate(
        { _id: pumpId },
        {
          $pull: {
            Customer: { CustomerId: customerId },
          },
        }
      );
      res.status(200).json({ deletedCustomer });
    } catch (err) {
      res.status(400).json({ err });
    }
  },
};
