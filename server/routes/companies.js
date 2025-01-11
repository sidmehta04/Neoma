// routes/companies.js
const express = require('express');
const rateLimit = require('express-rate-limit');

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests',
    message: 'Please try again later',
    timestamp: new Date().toISOString()
  }
});

module.exports = (supabase) => {
  const router = express.Router();

  // Search companies endpoint
  router.get('/search', limiter, async (req, res) => {
    try {
      // Input validation
      const query = req.query.q?.trim();
      const limit = parseInt(req.query.limit) || 5;

      if (!query) {
        return res.status(400).json({
          error: 'Search query is required',
          timestamp: new Date().toISOString()
        });
      }

      if (limit < 1 || limit > 50) {
        return res.status(400).json({
          error: 'Limit must be between 1 and 50',
          timestamp: new Date().toISOString()
        });
      }

      // Perform the search
      const { data, error } = await supabase
        .from('companies')
        .select(`
          id,
          name,
          symbol,
          sector,
          stock_prices (
            price,
            change_percentage,
            trade_date
          )
        `)
        .or(`name.ilike.%${query}%,symbol.ilike.%${query}%`)
        .order('name', { ascending: true })
        .limit(limit);

      if (error) {
        console.error('Supabase error:', error);
        return res.status(500).json({
          error: 'Failed to fetch search results',
          timestamp: new Date().toISOString(),
          details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
      }

      // Process and format the results
      const processedResults = data.map(company => ({
        id: company.id,
        name: company.name,
        symbol: company.symbol,
        sector: company.sector,
        price: company.stock_prices?.[0]?.price ?? 'N/A',
        change: company.stock_prices?.[0]?.change_percentage ?? 0,
      }));

      // Return the results
      res.json({
        success: true,
        results: processedResults,
        timestamp: new Date().toISOString()
      });

    } catch (err) {
      console.error('Search error:', err);
      res.status(500).json({
        error: 'Internal server error',
        timestamp: new Date().toISOString(),
        details: process.env.NODE_ENV === 'development' ? err.message : undefined
      });
    }
  });

  // Get single company details
  router.get('/:id', limiter, async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('companies')
        .select(`
          id,
          name,
          symbol,
          sector,
          stock_prices (
            price,
            change_percentage,
            trade_date
          )
        `)
        .eq('id', req.params.id)
        .single();

      if (error) {
        console.error('Supabase error:', error);
        return res.status(500).json({
          error: 'Failed to fetch company details',
          timestamp: new Date().toISOString()
        });
      }

      if (!data) {
        return res.status(404).json({
          error: 'Company not found',
          timestamp: new Date().toISOString()
        });
      }

      res.json({
        success: true,
        company: {
          id: data.id,
          name: data.name,
          symbol: data.symbol,
          sector: data.sector,
          price: data.stock_prices?.[0]?.price ?? 'N/A',
          change: data.stock_prices?.[0]?.change_percentage ?? 0,
        },
        timestamp: new Date().toISOString()
      });

    } catch (err) {
      console.error('Error fetching company:', err);
      res.status(500).json({
        error: 'Internal server error',
        timestamp: new Date().toISOString(),
        details: process.env.NODE_ENV === 'development' ? err.message : undefined
      });
    }
  });

  return router;
};