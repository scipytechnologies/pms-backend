const DailyreportSchema = require("../models/DailyreportSchema")
const SalesModel = require('../models/SalesAndBillingSchema');
module.exports = {
    getPumpSalesOnDate: async (req, res) => {
        const pumpId = req.params.id
        const targetDate = req.params.SalesAndBillingName
        try {
            const sales = await SalesModel.findById({ pumpId });
            console.log("sales",sales)

            if (!sales) {
                console.log(`Pump with ID ${pumpId} not found.`);
                return [];
            }

            const salesOnDate = sales.SalesAndBilling.filter((sale) => {
                return sale.SalesAndBillingName === targetDate;
            });
            if (salesOnDate.length === 0) {
                console.log(`No sales found for pump with ID ${pumpId} on ${targetDate}.`);
            }
            console.log("1",salesOnDate)

            const salesId = salesOnDate[0].SalesAndBillingId;
            console.log("2",salesId)

            const salesAndBillingDetails = await DailyreportSchema.findById(salesId);

            if (!salesAndBillingDetails) {
                console.log(`SalesAndBilling with ID ${salesId} not found.`);
            }

            res.status(200).json({ salesAndBillingDetails });
        } catch (error) {
            console.error('Error fetching pump sales:', error);
            res.status(400).json({ error })
        }
    }

}