export default function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const body = req.body || {};
    const password = body.password;
    const validPassword = process.env.APP_PASSWORD;

    // Debug: log what we received
    console.log('password received:', typeof password, password ? password.length : 'null');
    console.log('validPassword:', typeof validPassword, validPassword ? validPassword.length : 'null');

    if (!password) {
      return res.status(400).json({ error: 'Password required' });
    }

    if (password === validPassword) {
      // Test without cookies first
      return res.status(200).json({ success: true, debug: 'matched' });
    }

    return res.status(401).json({ error: 'Invalid password' });
  } catch (err) {
    console.error('Auth error:', err.stack || err.message);
    return res.status(500).json({ error: err.message, stack: err.stack });
  }
}
