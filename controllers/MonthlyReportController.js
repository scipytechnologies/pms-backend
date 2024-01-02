const moment = require('moment')
const SalesModel = require('../models/SalesAndBillingSchema');
module.exports = {
    getPumpSalesOnMonth: async (req, res) => {
        const pumpId = req.params.id
        const targetDate = req.params.Date
        try {
            const sales = await SalesModel.find({ PumpId: pumpId });
            console.log("salesdate",sales)
           
            const targetMonth = moment(targetDate).format('MM');
            console.log("Target Month:", targetMonth);

            const salesByMonth = sales.filter((sale) => moment(sale.Date).format('MM') === targetMonth);

            if (salesByMonth.length === 0) {
                console.log(`No sales found for pump with ID ${pumpId} in month ${targetMonth}.`);
                return res.status(404).json({ error: `No sales found for pump with ID ${pumpId} in month ${targetMonth}.` });
            }
            res.status(200).json({ salesByMonth });

        } catch (error) {
            console.error('Error fetching pump sales:', error);
            res.status(400).json({ error })
        }
    }

}