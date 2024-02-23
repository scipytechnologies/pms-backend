const Payment = require("../models/PaymentSchema");
const Pump = require("../models/PumpSchema");
const Customer = require("../models/CustomerSchema");

async function AddPayment(pumpID, updateData) {
  try {
    const pump = await Pump.findById(pumpID);
    if (!pump) {
      console.log("No Pump Found");
    } else {
      const Customer = pump.Customer.find(
        (x) => x.CustomerId == updateData.CustomerID
      );
      if (!Customer) {
        console.log("Tank Not found");
      } else {
        const CustomerClone = Customer;
        CustomerClone.CreditBalance =
          parseInt(CustomerClone.CreditBalance) - parseInt(updateData.Amount);
        Object.assign(Customer, CustomerClone);
        await pump.save();
        const bal = CustomerClone.CreditBalance;
        console.log("Customer Credit Balance Updated");
        return bal;
      }
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  createPayment: async (req, res) => {
    const { CustomerID, Amount, Balance, Customer, PumpID } = req.body;
    try {
      let serialNumber = 10000;
      try {
        const latestCustomer = await Payment.findOne({
          PumpID: req.params.id,
        })
          .sort({ createdAt: -1 })
          .limit(1);

        if (latestCustomer.serialNumber != undefined && latestCustomer) {
          serialNumber = parseInt(latestCustomer.serialNumber) + 1;
        }
        console.log(latestCustomer.serialNumber);
      } catch (err) {
        console.log("NO DATA");
      }
      const result = await Payment.create({
        PumpID,
        CustomerID,
        Amount,
        Balance,
        Customer,
        serialNumber,
      });
      AddPayment(req.params.id, result);
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({ err });
    }
  },

  getPayment: async (req, res) => {
    const id = req.params.id;
    try {
      const result = await Payment.find({ PumpID: id });
      res.status(200).json({ result });
    } catch (err) {
      res.status(400).json({ err });
    }
  },

  getPaymentById: async (req, res) => {
    const id = req.params.id;
    try {
      const result2 = await Payment.findById(id);
      res.status(200).json({ result2 });
    } catch (err) {
      res.status(400).json({ err });
    }
  },

  updatePayment: async (req, res) => {
    const id = req.params.id;
    const { CustomerID, Amount, Balance } = req.body;
    try {
      await Payment.findByIdAndUpdate(id, {
        CustomerID,
        Amount,
        Balance,
      });
      res.status(200).json("success");
    } catch (err) {
      res.status(400).json({ err });
    }
  },

  deletePayment: async (req, res) => {
    const pumpId = req.params.pumpId;
    const paymentId = req.params.paymentId;
    try {
      const deletepayment = await Payment.findByIdAndDelete(paymentId);
      if (!deletepayment) {
        return res
          .status(404)
          .json({ error: "payment you want to delete is not found" });
      }
      const updatepump = await Pump.findByIdAndUpdate(pumpId, {
        $pull: {
          Payment: { PaymentId: deletepayment._id },
        },
      });
      if (!updatepump) {
        return res.status(401).json({ error: "Failed to delete payment" });
      }
      res.status(200).json({ deletepayment });
    } catch (err) {
      res.status(400).json({ err });
    }
  },
};
