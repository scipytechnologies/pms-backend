const Employee = require("../models/EmployeeSchema")
const Pump = require("../models/PumpSchema")
module.exports = {
    createEmployee: async (req, res) => {
        const { FirstName, LastName, DOB, PhoneNumber, Email, TemporaryAddress,
            PermanentAddress, AadhaarId, VoterId,
            PANCardNumber, PFNumber, ESINumber, UAN,
            Designation, Department, Salary, Note, AccountNumber,
            IFSCCode, Branch } = req.body;
        try {
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
                Branch
            });

            try {
                await Pump.findByIdAndUpdate(req.params.id, {
                    $push: {
                        Employee: [{
                            EmployeeId: result._id,
                            EmployeeName: result.FirstName + " " + result.LastName
                        }]
                    }
                });
                res.status(200).json("success");
            }
            catch (err) {
                res.status(401).json({err});
            }

        }
        catch (err) {
            res.status(400).json({ err });
        }
    },

    getEmployee: async (req, res) => {
        const id = req.params.id
        try {
            const result1 = await Employee.find()
            res.status(200).json({ result1 });
        }
        catch (err) {
            res.status(400).json({ err });
        }
    },
    getEmployeeById: async (req, res) => {
        const id = req.params.id
        try {
            const result2 = await Employee.findById(id)
            res.status(200).json({ result2 });
        }
        catch (err) {
            res.status(400).json({ err });
        }


    },

    updateEmployee: async (req, res) => {
        const id = req.params.id
        const { FirstName, LastName, DOB, PhoneNumber, Email, TemporaryAddress,
            PermanentAddress, AadhaarId, VoterId,
            PANCardNumber, PFNumber, ESINumber, UAN,
            Designation, Department, Salary, Note, AccountNumber,
            IFSCCode, Branch } = req.body;
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
                Branch
            });
            res.status(200).json("success");
        }
        catch (err) {
            res.status(400).json({ err });
        }

    },
    deleteEmployee: async (req, res) => {
        const id = req.params.id
        try {
            await Employee.findByIdAndDelete(id)
            res.status(200).json("success");
        }
        catch (err) {
            res.status(400).json({ err });
        }

    }
}
