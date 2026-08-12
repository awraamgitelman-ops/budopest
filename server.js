import express from 'express';
import path from 'path';
import https from 'https';
import http from 'http';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Security & Header Masking: Hide Express / Node / Host fingerprints
app.disable('x-powered-by');

app.use((req, res, next) => {
  // Masquerade as standard enterprise Nginx proxy
  res.setHeader('Server', 'nginx');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  // Remove possible cloud platform tracing headers if forwarded
  res.removeHeader('X-Powered-By');
  next();
});

// Image Proxy Endpoint (Server-Side Proxying for any external media)
app.get('/api/img-proxy', (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl || typeof targetUrl !== 'string') {
    return res.status(400).send('Missing url parameter');
  }

  // Only allow valid http/https URLs
  if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
    return res.status(400).send('Invalid url format');
  }

  const client = targetUrl.startsWith('https') ? https : http;
  
  const proxyReq = client.get(targetUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
    }
  }, (proxyRes) => {
    if (proxyRes.statusCode !== 200) {
      return res.status(proxyRes.statusCode || 500).send('Error fetching remote asset');
    }

    const contentType = proxyRes.headers['content-type'] || 'image/jpeg';
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=604800, immutable'); // Cache 7 days
    res.setHeader('Server', 'nginx');

    proxyRes.pipe(res);
  });

  proxyReq.on('error', (err) => {
    console.error('Image proxy stream error:', err.message);
    res.status(500).send('Proxy failure');
  });
});

// Serve compiled static files with long-term cache
app.use(express.static(path.join(__dirname, 'dist'), {
  maxAge: '7d',
  setHeaders: (res) => {
    res.setHeader('Server', 'nginx');
  }
}));

// SPA Catch-all routing
app.get('*', (req, res) => {
  res.setHeader('Server', 'nginx');
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Corporate portal server listening on port ${PORT}`);
});
