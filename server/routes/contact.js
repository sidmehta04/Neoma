// server/routes/contact.js
const express = require('express');
const router = express.Router();

// Basic country code length validation
const countryCodes = {
  "91": { minLength: 10, maxLength: 10 },
  "1": { minLength: 10, maxLength: 10 },
  "44": { minLength: 10, maxLength: 10 },
  "61": { minLength: 9, maxLength: 9 },
  "86": { minLength: 11, maxLength: 11 },
  "81": { minLength: 10, maxLength: 10 },
  "65": { minLength: 8, maxLength: 8 },
  "971": { minLength: 9, maxLength: 9 }
};

const validatePhoneNumber = (phone, countryCode) => {
  const rules = countryCodes[countryCode];
  if (!rules) {
    return { isValid: false, error: "Unsupported country code" };
  }

  const cleanPhone = phone.replace(/\D/g, "");

  if (cleanPhone.length < rules.minLength || cleanPhone.length > rules.maxLength) {
    return { 
      isValid: false, 
      error: `Phone number must be ${rules.minLength} digits for this country code` 
    };
  }

  return { isValid: true, phoneNumber: cleanPhone };
};

module.exports = (supabase) => {
  router.post('/submit', async (req, res) => {
    try {
      console.log('Contact submission received:', {
        timestamp: new Date().toISOString(),
        body: req.body
      });

      const { name, phone, countryCode } = req.body;

      // Validate required fields
      if (!name || !phone || !countryCode) {
        return res.status(400).json({ 
          error: "Name, phone, and country code are required" 
        });
      }

      // Basic name validation
      if (name.length < 2 || name.length > 50) {
        return res.status(400).json({ 
          error: "Name must be between 2 and 50 characters" 
        });
      }

      // Basic phone validation
      const validation = validatePhoneNumber(phone, countryCode);
      if (!validation.isValid) {
        return res.status(400).json({ error: validation.error });
      }

      // Format full phone number
      const fullPhoneNumber = `+${countryCode}${validation.phoneNumber}`;

      // Save to Supabase
      const { error: insertError } = await supabase
        .from("early_subscribers")
        .insert([{
          name: name.trim(),
          phone: fullPhoneNumber,
        }]);

      if (insertError) throw insertError;

      // Generate WhatsApp URL
      const businessPhone = "919220445243";
      const message = encodeURIComponent(
        `Hi, I'm ${name.trim()}. I'm interested in learning more about NEOMA.`
      );
      const whatsappUrl = `https://wa.me/${businessPhone}?text=${message}`;

      res.json({ 
        success: true, 
        whatsappUrl,
        message: "Successfully registered!" 
      });

    } catch (error) {
      console.error('Contact submission error:', error);
      res.status(500).json({ 
        error: "An error occurred while processing your request" 
      });
    }
  });

  return router;
};