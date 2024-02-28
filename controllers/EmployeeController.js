const Employee = require("../models/EmployeeSchema");
const Pump = require("../models/PumpSchema");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");

const s3Client = new S3Client({
  region: "ap-south-1", // Add your AWS region
  credentials: {
    accessKeyId: "AKIA4MTWGXBS7NF7QF5Z",
    secretAccessKey: "ipAbi9RTDiTfWXW6EgR3mLmzZQPqxvbvjo5jKD5O",
  },
});

module.exports = {
  createEmployee: async (req, res) => {
    const {
      FirstName,
      LastName,
      DOB,
      PhoneNumber,
      Email,
      TemporaryAddress,
      PermanentAddress,
      AadhaarId,
      VoterId,
      PANCardNumber,
      PFNumber,
      ESINumber,
      UAN,
      Designation,
      Department,
      Salary,
      Note,
      AccountNumber,
      IFSCCode,
      Branch,
    } = req.body;
    try {
      let serialNumber = 10000;
      try {
        const latestCustomer = await Employee.findOne({
          PumpId: req.params.id,
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
      const result = await Employee.create({
        FirstName,
        LastName,
        DOB,
        PhoneNumber,
        Email,
        TemporaryAddress,
        PermanentAddress,
        AadhaarId,
        VoterId,
        PANCardNumber,
        PFNumber,
        ESINumber,
        UAN,
        Designation,
        Department,
        Salary,
        Note,
        AccountNumber,
        IFSCCode,
        Branch,
        serialNumber,
        PumpId: req.params.id,
        image: req.file.originalname,
      });

      try {
        await Pump.findByIdAndUpdate(req.params.id, {
          $push: {
            Employee: [
              {
                EmployeeId: result._id,
                Designation: result.Designation,
                DOB: result.DOB,
                EmployeeName: result.FirstName + " " + result.LastName,
                serialNumber,
              },
            ],
          },
        });

        if (!req.file) {
          return res.status(200).json("success with NO Image");
        } else {
          const fileContent = fs.readFileSync(req.file.path);
          console.log(fileContent);
          const params = {
            Bucket: "indhanximages",
            Key: req.file.originalname,
            Body: fileContent,
          };
          const uploadCommand = new PutObjectCommand(params);
          await s3Client.send(uploadCommand);
          res.status(200).json("success with Image");
        }
      } catch (err) {
        res.status(401).json({ err });
      }
    } catch (err) {
      res.status(400).json({ err });
    }
  },

  getEmployee: async (req, res) => {
    const id = req.params.id;
    try {
      const result1 = await Employee.find();
      res.status(200).json({ result1 });
    } catch (err) {
      res.status(400).json({ err });
    }
  },
  getEmployeeById: async (req, res) => {
    const id = req.params.id;
    try {
      const result2 = await Employee.findById(id);
      res.status(200).json({ result2 });
    } catch (err) {
      res.status(400).json({ err });
    }
  },

  updateEmployee: async (req, res) => {
    const id = req.params.id;
    const pumpid = req.params.pumpid;
    const {
      FirstName,
      LastName,
      DOB,
      PhoneNumber,
      Email,
      TemporaryAddress,
      PermanentAddress,
      AadhaarId,
      VoterId,
      PANCardNumber,
      PFNumber,
      ESINumber,
      UAN,
      Designation,
      Department,
      Salary,
      Note,
      AccountNumber,
      IFSCCode,
      Branch,
    } = req.body;
    try {
      await Employee.findByIdAndUpdate(id, {
        FirstName,
        LastName,
        DOB,
        PhoneNumber,
        Email,
        TemporaryAddress,
        PermanentAddress,
        AadhaarId,
        VoterId,
        PANCardNumber,
        PFNumber,
        ESINumber,
        UAN,
        Designation,
        Department,
        Salary,
        Note,
        AccountNumber,
        IFSCCode,
        Branch,
      });
      // res.status(200).json("success");
      try {
        const object = await Pump.findById(pumpid);
        if (!object) {
          return res.status(404).send("Object not found");
        } else {
          const nestedEmployee = object.Employee.find(
            (nestedObj) => nestedObj.EmployeeId === id
          );
          if (!nestedEmployee) {
            return res.status(404).send("Nested object not found");
          }
          const updatedEmployeeData = {
            Designation: req.body.Designation,
            DOB: req.body.DOB,
            PhoneNumber: req.body.PhoneNumber,
            EmployeeName: req.body.FirstName + " " + req.body.LastName,
          };
          Object.assign(nestedEmployee, updatedEmployeeData);
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
  deleteEmployee: async (req, res) => {
    const pumpId = req.params.pumpId;
    const employeeId = req.params.employeeId;
    try {
      const deletedEmployee = await Employee.findByIdAndDelete(employeeId);

      if (!deletedEmployee) {
        return res.status(404).json({ error: "Employee not found" });
      }
      const pumpUpdate = await Pump.findByIdAndUpdate(pumpId, {
        $pull: {
          Employee: { EmployeeId: deletedEmployee._id },
        },
      });

      if (!pumpUpdate) {
        return res
          .status(500)
          .json({ error: "Failed to update Pump collection" });
      }
      res.status(200).json({ deletedEmployee });
    } catch (err) {
      res.status(400).json({ err });
    }
  },
};
