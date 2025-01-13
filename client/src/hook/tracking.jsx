import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const API_BASE_URL = import.meta.env.VITE_API_URL||import.meta.env.VITE_API_URL2 || 'http://localhost:5001';

const useVisitorTracking = () => {
  const location = useLocation();

  useEffect(() => {
    const trackVisitor = async () => {
      try {
        // Get visitor's location using IP-based geolocation
        const geoResponse = await fetch('https://ipapi.co/json/');
        const geoData = await geoResponse.json();

        // Get or create visitor ID
        const visitorId = localStorage.getItem('visitorId') || uuidv4();
        if (!localStorage.getItem('visitorId')) {
          localStorage.setItem('visitorId', visitorId);
        }

        // Get or create session ID
        const sessionId = sessionStorage.getItem('sessionId') || uuidv4();
        if (!sessionStorage.getItem('sessionId')) {
          sessionStorage.setItem('sessionId', sessionId);
        }

        // Prepare visitor data
        const visitorData = {
          visitor_id: visitorId,
          session_id: sessionId,
          path: location.pathname,
          referrer: document.referrer || 'direct',
          device_type: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
          latitude: geoData.latitude,
          longitude: geoData.longitude,
          city: geoData.city,
          country: geoData.country_name,
          ip_address: geoData.ip,
          user_agent: navigator.userAgent
        };

        // Send data to backend
        const response = await fetch(`${API_BASE_URL}/api/analytics/track`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(visitorData),
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Failed to track visitor');
        }

      } catch (error) {
        console.error('Error tracking visitor:', error);
      }
    };

    trackVisitor();
  }, [location.pathname]); // Track on path change
};

export default useVisitorTracking;