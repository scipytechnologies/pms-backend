const FuelTesting = require("../models/FuelTestingSchema");
const Pump = require("../models/PumpSchema");

module.exports = {
  createFuelTest: async (req, res) => {
    const {
      EmployeeName,
      EmployeeId,
      NozzleId,
      Product,
      Opening,
      Closing,
      Quantity,
      TestResult,
      Date,
    } = req.body;
    try {
      const result = await FuelTesting.create({
        EmployeeName,
        EmployeeId,
        NozzleId,
        Product,
        Opening,
        Closing,
        Quantity,
        TestResult,
        Date,
      });
      try {
        const update = await Pump.findByIdAndUpdate(req.params.id, {
          $push: {
            FuelTesting: [
              {
                FuelTestId: result._id,
                Date: result.Date,
                EmployeeName: result.EmployeeName,
                Quantity: result.Quantity,
                TestResult: result.TestResult,
              },
            ],
          },
        });
        res.status(200).json(update)
      } catch (err) {
        res.status(404).json({ err });
      }
    } catch (err) {
      res.status(400).json({ err });
    }
  },
  getFuelTest: async (req, res) => {
    try {
      const result1 = await FuelTesting.find();
      res.status(200).json({ result1 });
    } catch (err) {
      res.status(400).json({ err });
    }
  },
  getFuelTestById: async (req, res) => {
    const id = req.params.id;
    try {
      const result2 = await FuelTesting.findById(id);
      res.status(200).json({ result2 });
    } catch (err) {
      res.status(400).json({ err });
    }
  },
  editFuelTest: async (req, res) => {
    const id = req.params.id;
    const {
      EmployeeName,
      EmployeeId,
      NozzleId,
      Product,
      Opening,
      Closing,
      Quantity,
      TestResult,
      Date,
    } = req.body;
    try {
      await FuelTesting.findByIdAndUpdate(id, {
        EmployeeName,
        EmployeeId,
        NozzleId,
        Product,
        Opening,
        Closing,
        Quantity,
        TestResult,
        Date,
      });
      res.status(200).json("Fuel Testing Updated");
    } catch (err) {
      res.status(400).json({ err });
    }
  },
  deleteFuelTest: async (req, res) => {
    const id = req.params.id;
    const PumpId = req.params.PumpId;
    try {
      const deletefueltest = await FuelTesting.findByIdAndDelete(id);
      if (!deletefueltest) {
        return res.status(401).json("Fuel Test Not Found");
      }

      const updatefueltest = await Pump.findByIdAndUpdate(PumpId, {
        $pull: {
          FuelTesting: {
            FuelTestId: deletefueltest._id,
          },
        },
      });
      if (!updatefueltest) {
        return res.status(500).json("No Fuel Test Found");
      }
      res.status(200).json({ updatefueltest });
    } catch (err) {
      res.status(400).json({ err });
    }
  },
};

