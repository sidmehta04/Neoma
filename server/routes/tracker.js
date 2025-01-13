// routes/visitor-tracking.js
const express = require('express');
const router = express.Router();

module.exports = (supabase) => {
  // Track new visitor
  router.post('/track', async (req, res) => {
    try {
      const visitorData = {
        visitor_id: req.body.visitor_id,
        session_id: req.body.session_id,
        path: req.body.path,
        referrer: req.body.referrer,
        device_type: req.body.device_type,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        city: req.body.city,
        country: req.body.country,
        ip_address: req.body.ip_address,
        user_agent: req.body.user_agent,
        timestamp: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('visitor_tracking')
        .insert([visitorData]);

      if (error) throw error;

      res.json({
        success: true,
        message: 'Visitor tracking data recorded',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error tracking visitor:', error);
      res.status(500).json({
        error: 'Failed to record visitor data',
        details: error.message,
        timestamp: new Date().toISOString()
      });
    }
  });

  // Get visitor statistics
  router.get('/stats', async (req, res) => {
    try {
      const { data: stats, error } = await supabase
        .from('daily_visitor_stats')
        .select('*')
        .order('date', { ascending: false })
        .limit(30);

      if (error) throw error;

      res.json({
        success: true,
        data: stats,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error fetching visitor stats:', error);
      res.status(500).json({
        error: 'Failed to fetch visitor statistics',
        details: error.message,
        timestamp: new Date().toISOString()
      });
    }
  });

  // Get unique visitors count
  router.get('/unique', async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('visitor_tracking')
        .select('visitor_id', { distinct: true })
        .count();

      if (error) throw error;

      res.json({
        success: true,
        count: data.length,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error counting unique visitors:', error);
      res.status(500).json({
        error: 'Failed to count unique visitors',
        details: error.message,
        timestamp: new Date().toISOString()
      });
    }
  });

  return router;
};