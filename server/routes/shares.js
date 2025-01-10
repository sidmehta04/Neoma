// server/routes/shares.js
const express = require('express');
const router = express.Router();

module.exports = (supabase) => {
  // Get all shares with latest prices
  router.get('/', async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('companies')
        .select(`
          id,
          name,
          symbol,
          logo,
          stock_prices (
            price,
            change_percentage,
            trade_date,
            marketcap
          )
        `);

      if (error) throw error;

      const processedShares = data
        .filter(company => company.stock_prices && company.stock_prices.length > 0)
        .map(company => {
          const latestPrice = company.stock_prices.reduce((latest, current) => {
            if (!latest.trade_date) return current;
            return new Date(current.trade_date) > new Date(latest.trade_date) ? current : latest;
          }, {});

          return {
            id: company.id,
            name: company.name,
            symbol: company.symbol,
            logo: company.logo || '',
            latestPrice: {
              price: latestPrice.price,
              change_percentage: latestPrice.change_percentage,
              trade_date: latestPrice.trade_date,
              marketcap: latestPrice.marketcap
            }
          };
        });

      res.json(processedShares);
    } catch (error) {
      console.error('Error fetching shares:', error);
      res.status(500).json({ 
        error: 'Failed to fetch shares',
        details: error.message
      });
    }
  });

  // Get single share details
  router.get('/:name', async (req, res) => {
    try {
      const { name } = req.params;
      
      const { data, error } = await supabase
        .from('companies')
        .select(`
          id,
          name,
          symbol,
          logo,
          description,
          stock_prices (
            price,
            change_percentage,
            trade_date,
            marketcap,
            volume
          )
        `)
        .eq('name', decodeURIComponent(name))
        .single();

      if (error) throw error;
      if (!data) {
        return res.status(404).json({ error: 'Share not found' });
      }

      res.json(data);
    } catch (error) {
      console.error('Error fetching share details:', error);
      res.status(500).json({ 
        error: 'Failed to fetch share details',
        details: error.message
      });
    }
  });

  return router;
};