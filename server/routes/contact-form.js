const express = require('express');
const router = express.Router();

module.exports = (supabase) => {
  // Submit contact form
  router.post('/submit', async (req, res) => {
    try {
      console.log('Contact form submission received:', req.body);
      
      const { name, email, phone, subject, message, timestamp } = req.body;

      // Validate required fields
      if (!name || !email || !message) {
        return res.status(400).json({ 
          error: "Name, email, and message are required" 
        });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ 
          error: "Please enter a valid email address" 
        });
      }

      // Prepare contact data with proper timestamp handling
      const contactData = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || null,
        subject: subject?.trim() || null,
        message: message.trim(),
        // Use the timestamp from the client if provided, otherwise create a new one
        created_at: timestamp || new Date().toISOString(),
        // Add updated_at for database tracking
      };

      // Debug log the data being inserted
      console.log('Attempting to insert contact data:', contactData);

      // Save to Supabase with better error handling
      const { data, error: insertError } = await supabase
        .from("contacts")
        .insert([contactData])
        .select();

      if (insertError) {
        console.error('Supabase insert error:', insertError);
        
        // Handle specific database errors
        if (insertError.code === '23505') { // Unique violation
          return res.status(409).json({
            error: "This contact submission already exists."
          });
        }
        
        if (insertError.code === '23502') { // Not null violation
          return res.status(400).json({
            error: "Missing required fields in the database."
          });
        }
        
        throw insertError;
      }

      console.log('Contact form submission successful:', data);

      res.json({ 
        success: true,
        message: "Thank you for your message. We will get back to you soon!",
        data: data[0]
      });

    } catch (error) {
      console.error('Contact form submission error:', {
        message: error.message,
        code: error.code,
        details: error.details
      });

      // Send appropriate error response
      res.status(500).json({ 
        error: "An error occurred while submitting your message. Please try again.",
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  });

  return router;
};