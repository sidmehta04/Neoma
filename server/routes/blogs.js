// server/routes/blog.js
const express = require('express');
const router = express.Router();

module.exports = (supabase) => {
  // Blog posts endpoint
  router.get('/', async (req, res) => {
    try {
      if (!supabase) {
        throw new Error('Supabase client not initialized');
      }

      console.log('Attempting to fetch blog posts...');
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, description, read_time, published_at, slug, featured_image')
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log(`Successfully fetched ${data?.length || 0} blog posts`);
      res.json(data);
    } catch (error) {
      console.error('Detailed error in /api/blog-posts:', error);
      res.status(500).json({ 
        error: 'Failed to load blog posts',
        details: error.message,
        timestamp: new Date().toISOString()
      });
    }
  });

  // Single blog post endpoint
  router.get('/:slug', async (req, res) => {
    try {
      if (!supabase) {
        throw new Error('Supabase client not initialized');
      }

      const { slug } = req.params;
      console.log(`Attempting to fetch blog post with slug: ${slug}`);

      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      if (!data) {
        return res.status(404).json({ error: 'Blog post not found' });
      }

      console.log(`Successfully fetched blog post: ${slug}`);
      res.json(data);
    } catch (error) {
      console.error('Detailed error in /api/blog-posts/:slug:', error);
      res.status(500).json({ 
        error: 'Failed to load blog post',
        details: error.message,
        timestamp: new Date().toISOString()
      });
    }
  });

  return router;
};