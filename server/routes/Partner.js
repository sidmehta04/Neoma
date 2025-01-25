// routes/partner.js
const express = require('express');
const router = express.Router();

module.exports = (supabase) => {
 // Submit partner form
 router.post('/', async (req, res) => {
   try {
     const { name, phone_number, email, message } = req.body;

     // Validate required fields
     if (!name || !phone_number || !email || !message) {
       return res.status(400).json({
         error: 'Missing required fields',
         timestamp: new Date().toISOString()
       });
     }

     // Email validation
     const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
     if (!emailRegex.test(email)) {
       return res.status(400).json({
         error: 'Invalid email format',
         timestamp: new Date().toISOString()
       });
     }

     // Insert into Supabase
     const { data, error } = await supabase
       .from('partner_form')
       .insert([
         { name, phone_number, email, message }
       ])
       .select();

     if (error) throw error;

     res.status(201).json({
       message: 'Form submitted successfully',
       data: data[0],
       timestamp: new Date().toISOString()
     });

   } catch (error) {
     console.error('Partner form error:', error);
     res.status(500).json({
       error: 'Error submitting form',
       details: error.message,
       timestamp: new Date().toISOString()
     });
   }
 });

 return router;
};