const moment = require('moment')
const SalesModel = require('../models/SalesAndBillingSchema');
module.exports = {
    getPumpSalesOnYear: async (req, res) => {
        const pumpId = req.params.id
        const targetDate = req.params.Date
        try {
            const sales = await SalesModel.find({ PumpId: pumpId });
            console.log("salesdate",sales)
           
            const targetYear = moment(targetDate).format('YYYY');
            console.log("Target Month:", targetYear);

            const salesByYear = sales.filter((sale) => moment(sale.Date).format('YYYY') === targetYear);

            if (salesByYear.length === 0) {
                console.log(`No sales found for pump with ID ${pumpId} in year ${targetYear}.`);
                return res.status(404).json({ error: `No sales found for pump with ID ${pumpId} in year ${targetYear}.` });
            }
            res.status(200).json({ salesByYear });

        } catch (error) {
            console.error('Error fetching pump sales:', error);
            res.status(400).json({ error })
        }
    }

}