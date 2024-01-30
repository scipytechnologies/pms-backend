const SalesAndBilling = require("../models/SalesAndBillingSchema");
const Pump = require("../models/PumpSchema");
module.exports = {
  createSalesAndBilling: async (req, res) => {
    const {
      PumpId,
      Employee,
      EmployeeId,
      Shift,
      TotalAmount,
      ExcessAmount,
      Date,
      Dinomination,
      Product,
      CardPayment,
      UpiPayment,
      OthersPayment,
      TotalAmountRec,
      Credit
    } = req.body;

    console.log(req.body);
    try {
      const result = await SalesAndBilling.create({
        PumpId,
        Employee,
        Cardpayment :CardPayment,
        Upipayment : UpiPayment,
        Otherpayment : OthersPayment,
        EmployeeId,
        Shift,
        TotalAmount,
        ExcessAmount,
        Date,
        Dinomination,
        Product,
        TotalAmountRec,
        Credit
      });

      console.log(result);

      try {
        await Pump.findByIdAndUpdate(req.params.id, {
          $push: {
            SalesAndBilling: {
              ID: result._id,
              Date: result.Date,
              Employee: result.Employee,
              EmployeeId: result.EmployeeId,
              Shift: result.Shift,
              TotalAmount: result.TotalAmount,
            },
          },
        });

        res.status(200).json("success");
      } catch (err) {
        res.status(401).json({ err });
      }

      try {
        const pump = await Pump.findById(req.params.id);
        if (!pump) {
          console.log("No Pump Found");
        } else {
          Product.map((item) => {
            const Nozzles = pump.Nozzle;
            const index = Nozzles.findIndex(
              (obj) => obj._id.toString() === item.NozzleId
            );
            Nozzles[index].Reading = item.Closing;

            const Tank = pump.Tank.find(
              (tank) => tank._id == Nozzles[index].FuelId
            );
            const TankClone = Tank;
            TankClone.Quantity =
              parseInt(TankClone.Quantity) - parseInt(item.Quantity);
            Object.assign(Tank, TankClone);
          });
          await pump.save();
          console.log("Nozzle Updated");
        }
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      res.status(400).json(err);
    }
  },

  getSalesAndBilling: async (req, res) => {
    // const id=req.params.id
    try {
      const result1 = await SalesAndBilling.find();
      res.status(200).json({ result1 });
    } catch (err) {
      res.status(400).json({ err });
    }
  },
  getSalesAndBillingById: async (req, res) => {
    const id = req.params.id;
    try {
      const result2 = await SalesAndBilling.findById(id);
      res.status(200).json({ result2 });
    } catch (err) {
      res.status(400).json({ err });
    }
  },
  updateSalesAndBilling: async (req, res) => {
    const id = req.params.id;
    try {
      await SalesAndBilling.findByIdAndUpdate(id, {
        Name: req.body.Name,
        Shift: req.body.Shift,
        TotalAmount: req.body.TotalAmount,
        ExcessAmount: req.body.ExcessAmount,
        Date: req.body.Date,
        Dinomination: req.body.Dinomination,
        Product: req.body.Product,
        Paymentmethod: req.body.Paymentmethod,
      });
      res.status(200).json("success");
    } catch (err) {
      res.status(400).json({ err });
    }
  },
  deleteSalesAndBilling: async (req, res) => {
    const id = req.params.id;
    try {
      await SalesAndBilling.findByIdAndDelete(id);
      res.status(200).json("success");
    } catch (err) {
      res.status(400).json({ err });
    }
  },
  getSalesReport: async (req, res) => {
    let filter ={}
    const date=req.query.date
    const employ = req.query.employ
    const  dateFilter = {"Date": { $regex: `^${date}`}}
    const  employFilter = {"EmployeeId": employ}
    if(date !== "all"){
        filter ={...filter,...dateFilter}
    }
    if(employ !== "all") {
      filter = {...filter,...employFilter}
    }
    console.log(filter);
    try {
      const transactions = await SalesAndBilling.find(filter);

      
      // Function to filter transactions for a specific year
      function filterTransactionsByYear(transactions, year) {
        return transactions.filter(transaction => new Date(transaction.Date).getFullYear() === year);
      }
      
      // Function to filter transactions for a specific month and year
      function filterTransactionsByMonth(transactions, year, month) {
        return transactions.filter(
          transaction =>
            new Date(transaction.Date).getFullYear() === year &&
            new Date(transaction.Date).getMonth() === month - 1
        );
      }
      
      // Function to filter transactions for a specific date
      function filterTransactionsByDate(transactions, date) {
        return transactions.filter(transaction => transaction.Date === date);
      }
      
      // Function to generate Yearly Report by Product
      function generateYearlyReportByProduct(transactions, year) {
        const yearlyTransactions = filterTransactionsByYear(transactions, year);
      
        const yearlyReportByProduct = {};
        yearlyTransactions.forEach(transaction => {
          transaction.Product.forEach(product => {
            const productName = product.Product;
            if (!yearlyReportByProduct[productName]) {
              yearlyReportByProduct[productName] = {
                Quantity: 0,
                Amount: 0,
              };
            }
      
            yearlyReportByProduct[productName].Quantity += parseFloat(product.Quantity);
            yearlyReportByProduct[productName].Amount += parseFloat(product.Amount);
          });
        });
      
        // Return or log the yearly report by product
        console.log(`Yearly Report for ${year} by Product:`, yearlyReportByProduct);
      }
      
      // Function to generate Monthly Report by Product
      function generateMonthlyReportByProduct(transactions, year, month) {
        const monthlyTransactions = filterTransactionsByMonth(transactions, year, month);
      
        const monthlyReportByProduct = {};
        monthlyTransactions.forEach(transaction => {
          transaction.Product.forEach(product => {
            const productName = product.Product;
            if (!monthlyReportByProduct[productName]) {
              monthlyReportByProduct[productName] = {
                Quantity: 0,
                Amount: 0,
              };
            }
      
            monthlyReportByProduct[productName].Quantity += parseFloat(product.Quantity);
            monthlyReportByProduct[productName].Amount += parseFloat(product.Amount);
          });
        });
      
        // Return or log the monthly report by product
        console.log(`Monthly Report for ${year}-${month} by Product:`, monthlyReportByProduct);
      }
      
      // Function to generate Daily Report by Product
      function generateDailyReportByProduct(transactions, date) {
        const dailyTransactions = filterTransactionsByDate(transactions, date);
      
        const dailyReportByProduct = {};
        dailyTransactions.forEach(transaction => {
          transaction.Product.forEach(product => {
            const productName = product.Product;
            if (!dailyReportByProduct[productName]) {
              dailyReportByProduct[productName] = {
                Quantity: 0,
                Amount: 0,
              };
            }
      
            dailyReportByProduct[productName].Quantity += parseFloat(product.Quantity);
            dailyReportByProduct[productName].Amount += parseFloat(product.Amount);
          });
        });
      
        // Return or log the daily report by product
        console.log(`Daily Report for ${date} by Product:`, dailyReportByProduct);
      }
      
      // Example usage:
      generateYearlyReportByProduct(transactions, 2024);
      generateMonthlyReportByProduct(transactions, 2024, 1);
      generateDailyReportByProduct(transactions, date);
      
      res.status(200).json({ transactions });
    } catch (err) {
      res.status(400).json({ err });
    }
  },
};
