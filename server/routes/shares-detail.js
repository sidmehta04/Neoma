const express = require('express');
const router = express.Router();

module.exports = (supabase) => {
  // Get share details by name
  router.get('/:shareName', async (req, res) => {
    try {
      const { shareName } = req.params;
      
      // Fetch company data with relationships
      const { data: companies, error: companyError } = await supabase
        .from("companies")
        .select(`
          id, name, symbol, sector, face_value, about,logo,
          cin, registered_office, incorporation_date,
          board_members:board_members (id, name, position, category),
          company_subsidiaries:company_subsidiaries (id, name, relationship_type, ownership_percentage),
          shareholding_pattern:shareholding_pattern (id, category, shares, percentage, as_of_date),
          stock_prices:stock_prices (id, price, change_percentage, trade_date, volume, marketcap, pe_ratio, book_valur),
          company_highlights:company_highlights (id, highlight)
        `)
        .eq("name", decodeURIComponent(shareName))
        .order('id', { ascending: true });

      if (companyError) throw companyError;

      if (!companies || companies.length === 0) {
        return res.status(404).json({ error: "Company not found" });
      }

      const company = companies[0];

      // Sort related data
      company.stock_prices = (company.stock_prices || []).sort(
        (a, b) => new Date(b.trade_date) - new Date(a.trade_date)
      );

      company.shareholding_pattern = (company.shareholding_pattern || []).sort(
        (a, b) => new Date(b.as_of_date) - new Date(a.as_of_date)
      );

      // Add computed fields
      const processedData = {
        ...company,
        latestPrice: company.stock_prices[0],
        latestShareholding: company.shareholding_pattern[0],
        market_cap: company.stock_prices[0]?.marketcap || "N/A",
      };

      res.json(processedData);
    } catch (error) {
      console.error('Error fetching share details:', error);
      res.status(500).json({ 
        error: 'Failed to fetch share details',
        details: error.message
      });
    }
  });

  // Get list of all shares
  router.get('/', async (req, res) => {
    try {
      const { data: shares, error } = await supabase
        .from('companies')
        .select(`
          id, name, symbol,
          stock_prices (
            price, change_percentage, trade_date, marketcap
          )
        `);

      if (error) throw error;

      const processedShares = shares.map(company => {
        const latestPrice = company.stock_prices?.sort(
          (a, b) => new Date(b.trade_date) - new Date(a.trade_date)
        )[0];

        return {
          id: company.id,
          name: company.name,
          symbol: company.symbol,
          latestPrice: latestPrice || null
        };
      });

      res.json(processedShares);
    } catch (error) {
      console.error('Error fetching shares list:', error);
      res.status(500).json({ 
        error: 'Failed to fetch shares list',
        details: error.message
      });
    }
  });

  return router;
};