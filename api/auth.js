export default function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      res.setHeader('Content-Type', 'application/json');
      res.status(405);
      return res.end(JSON.stringify({ error: 'Method not allowed' }));
    }

    const { password } = req.body || {};
    const validPassword = process.env.APP_PASSWORD;

    if (!password) {
      res.setHeader('Content-Type', 'application/json');
      res.status(400);
      return res.end(JSON.stringify({ error: 'Password required' }));
    }

    if (password === validPassword) {
      const maxAge = 60 * 60 * 24 * 30;
      const authCookie = `auth_token=authenticated; HttpOnly; SameSite=Lax; Path=/; Max-Age=${maxAge}; Secure`;
      const loginCookie = `logged_in=1; SameSite=Lax; Path=/; Max-Age=${maxAge}; Secure`;

      res.setHeader('Set-Cookie', [authCookie, loginCookie]);
      res.setHeader('Content-Type', 'application/json');
      res.status(200);
      return res.end(JSON.stringify({ success: true }));
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(401);
    return res.end(JSON.stringify({ error: 'Invalid password' }));
  } catch (err) {
    console.error('Auth error:', err);
    res.setHeader('Content-Type', 'application/json');
    res.status(500);
    return res.end(JSON.stringify({ error: err.message }));
  }
}
