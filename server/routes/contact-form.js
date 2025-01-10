// server/routes/contact-form.js
const express = require('express');
const router = express.Router();

module.exports = (supabase) => {
  // Submit contact form
  router.post('/submit', async (req, res) => {
    try {
      console.log('Contact form submission received:', req.body);
      
      const { name, email, phone, subject, message } = req.body;

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

      // Save to Supabase
      const { data, error: insertError } = await supabase
        .from("contacts")
        .insert([{
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone?.trim() || null,
          subject: subject?.trim() || null,
          message: message.trim(),
          created_at: new Date().toLocaleTimeString()
        }])
        .select();

      if (insertError) {
        console.error('Supabase insert error:', insertError);
        throw insertError;
      }

      console.log('Contact form submission successful:', data);

      res.json({ 
        success: true,
        message: "Thank you for your message. We will get back to you soon!" 
      });

    } catch (error) {
      console.error('Contact form submission error:', error);
      res.status(500).json({ 
        error: "An error occurred while submitting your message. Please try again." 
      });
    }
  });

  return router;
};