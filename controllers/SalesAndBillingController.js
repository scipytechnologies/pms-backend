const SalesAndBilling = require("../models/SalesAndBillingSchema");
const Pump = require("../models/PumpSchema");

// Function to filter transactions for a specific year
function filterTransactionsByYear(transactions, year) {
  return transactions.filter(
    (transaction) => new Date(transaction.Date).getFullYear() === year
  );
}

// Function to filter transactions for a specific month and year
function filterTransactionsByMonth(transactions, year, month) {
  return transactions.filter(
    (transaction) =>
      new Date(transaction.Date).getFullYear() === year &&
      new Date(transaction.Date).getMonth() === month - 1
  );
}

// Function to filter transactions for a specific date
function filterTransactionsByDate(transactions, date) {
  return transactions.filter((transaction) => transaction.Date === date);
}

// Function to generate Yearly Report by Product
function generateYearlyReportByProduct(transactions, year) {
  const yearlyTransactions = filterTransactionsByYear(transactions, year);

  const yearlyReportByProduct = {};
  yearlyTransactions.forEach((transaction) => {
    transaction.Product.forEach((product) => {
      const productName = product.Product;
      if (!yearlyReportByProduct[productName]) {
        yearlyReportByProduct[productName] = {
          Quantity: 0,
          Amount: 0,
        };
      }

      yearlyReportByProduct[productName].Quantity += parseFloat(
        product.Quantity
      );
      yearlyReportByProduct[productName].Amount += parseFloat(product.Amount);
    });
  });

  // Return or log the yearly report by product
  const calc = { year: year, product: yearlyReportByProduct };
  console.log(`Yearly Report for ${year} by Product:`, yearlyReportByProduct);
  return calc;
}

// Function to generate Monthly Report by Product
function generateMonthlyReportByProduct(transactions, year, month) {
  const monthlyTransactions = filterTransactionsByMonth(
    transactions,
    year,
    month
  );

  const monthlyReportByProduct = {};
  monthlyTransactions.forEach((transaction) => {
    transaction.Product.forEach((product) => {
      const productName = product.Product;
      if (!monthlyReportByProduct[productName]) {
        monthlyReportByProduct[productName] = {
          Quantity: 0,
          Amount: 0,
        };
      }

      monthlyReportByProduct[productName].Quantity += parseFloat(
        product.Quantity
      );
      monthlyReportByProduct[productName].Amount += parseFloat(product.Amount);
    });
  });

  // Return or log the monthly report by product
  const calc = { year: year, month: month, product: monthlyReportByProduct };
  console.log(calc);
  console.log(
    `Monthly Report for ${year}-${month} by Product:`,
    monthlyReportByProduct
  );
  return calc;
}

// Function to generate Daily Report by Product
function generateDailyReportByProduct(transactions, date) {
  const dailyTransactions = filterTransactionsByDate(transactions, date);

  const dailyReportByProduct = {};
  dailyTransactions.forEach((transaction) => {
    transaction.Product.forEach((product) => {
      const productName = product.Product;
      if (!dailyReportByProduct[productName]) {
        dailyReportByProduct[productName] = {
          Quantity: 0,
          Amount: 0,
        };
      }

      dailyReportByProduct[productName].Quantity += parseFloat(
        product.Quantity
      );
      dailyReportByProduct[productName].Amount += parseFloat(product.Amount);
    });
  });

  // Return or log the daily report by product
  const calc = { date: date, product: dailyReportByProduct };
  console.log(`Daily Report for ${date} by Product:`, dailyReportByProduct);
  return calc;
}
function getEmployeeSalesReport(transactions, targetDate) {
  // Filter transactions for the target date
  const transactionsOnDate = transactions.filter(transaction => transaction.Date === targetDate);

  // Create a map to store employee-wise sales
  const employeeSalesMap = new Map();

  // Calculate sales for each employee
  transactionsOnDate.forEach(transaction => {
    const employeeName = transaction.Employee;
    const totalAmount = parseFloat(transaction.TotalAmount);
    const shift = transaction.Shift;
    const product = transaction.Product[0];

    // Check if the employee is already in the map
    if (employeeSalesMap.has(employeeName)) {
      // Update total sales for the employee
      employeeSalesMap.get(employeeName).totalSales += totalAmount;
      // Update product quantities, prices, and amounts for the corresponding shift
      const shiftSales = employeeSalesMap.get(employeeName).shiftSales;
      const existingShift = shiftSales.find(shiftEntry => shiftEntry.shift === shift);
      if (existingShift) {
        existingShift.quantity += parseFloat(product.Quantity);
        existingShift.price += parseFloat(product.Price);
        existingShift.amount += parseFloat(product.Amount);
      } else {
        shiftSales.push({
          shift,
          quantity: parseFloat(product.Quantity),
          price: parseFloat(product.Price),
          amount: parseFloat(product.Amount),
        });
      }
    } else {
      // Add the employee to the map
      employeeSalesMap.set(employeeName, {
        totalSales: totalAmount,
        shiftSales: [
          {
            shift,
            quantity: parseFloat(product.Quantity),
            price: parseFloat(product.Price),
            amount: parseFloat(product.Amount),
          },
        ],
      });
    }
  });

  // Convert the map to an array of objects
  const employeeSalesReport = Array.from(employeeSalesMap, ([employee, { totalSales, shiftSales }]) => ({
    employee,
    totalSales,
    shiftSales,
  }));

  return employeeSalesReport;
}

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
      Credit,
    } = req.body;

    console.log(req.body);
    try {
      const result = await SalesAndBilling.create({
        PumpId,
        Employee,
        Cardpayment: CardPayment,
        Upipayment: UpiPayment,
        Otherpayment: OthersPayment,
        EmployeeId,
        Shift,
        TotalAmount,
        ExcessAmount,
        Date,
        Dinomination,
        Product,
        TotalAmountRec,
        Credit,
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
  },  SalesChart: async (req, res) => {
    const id = req.params.id;
    try {
      const allSalesData = await SalesAndBilling.aggregate([
        {
          $match: {
            PumpId: id,
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: { $toDate: "$Date" } } },
            totalSales: { $sum: { $toDouble: "$TotalAmount" } }
          }
        },
        { $sort: { _id: 1 } } // Sort by date
      ]);
  
      // Extracting dates and sales values
      const dates = allSalesData.map(entry => entry._id);
      const totalSales = allSalesData.map(entry => entry.totalSales);
  
      res.json({ dates, totalSales });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  getSalesReport: async (req, res) => {
    let filter = {};
    const date = req.query.date;
    const employ = req.query.employ;
    const dateFilter = { Date: { $regex: `^${date}` } };
    const employFilter = { EmployeeId: employ };
    // if (date !== "all") {
    //   filter = { ...filter, ...dateFilter };
    // }
    if (employ !== "all") {
      filter = { ...filter, ...employFilter };
    }

    try {
      const transactions = await SalesAndBilling.find(filter);
      if (date == "all") {
        const step = [2023, 2024]; // need to dynamic yearing or yearly maintanance
        const result = step.map((x) => {
          return generateYearlyReportByProduct(transactions, x);
        });
        res.status(200).json(result);
      } else {
        const [year, month, day] = date.split("-");
        if (year) {
          if (month !== "all" && month !== undefined) {
            if (day !== undefined) {
              const result = getEmployeeSalesReport(transactions, date);
              const data={report:result}
              res.status(200).json(data);
            } else {
              const month = new Date(date).getMonth() + 1;
              function getDaysArrayInMonth(year, month) {
                const daysInMonth = new Date(year, month, 0).getDate();
                return Array.from(
                  { length: daysInMonth },
                  (_, index) => index + 1
                );
              }
              const step = getDaysArrayInMonth(year, month);
              // console.log(month.toString().padStart(2, '0'));
              const result = step.map((x) => {
                return generateDailyReportByProduct(
                  transactions,
                  `${year}-${month.toString().padStart(2, "0")}-${x
                    .toString()
                    .padStart(2, "0")}`
                );
              });
              res.status(200).json(result);
            }
          } else {
            console.log(year);
            const step = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
            const result = step.map((x) => {
              return generateMonthlyReportByProduct(
                transactions,
                parseInt(year),
                parseInt(x)
              ); //////////////////////////////
            });
            res.status(200).json(result);
          }
        }
      }

      // Example usage:
      // generateYearlyReportByProduct(transactions, 2024);
      // generateMonthlyReportByProduct(transactions, 2024, 1);
      // generateDailyReportByProduct(transactions, date);

      // console.log(result);
      // res.status(200).json({ result });
    } catch (err) {
      res.status(400).json({ err });
    }
  },
};
