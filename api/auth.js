export default function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { password } = req.body || {};
    const validPassword = process.env.APP_PASSWORD;

    if (!password) {
      return res.status(400).json({ error: 'Password required' });
    }

    if (password === validPassword) {
      const maxAge = 60 * 60 * 24 * 30;
      const authCookie = `auth_token=authenticated; HttpOnly; SameSite=Lax; Path=/; Max-Age=${maxAge}; Secure`;
      const loginCookie = `logged_in=1; SameSite=Lax; Path=/; Max-Age=${maxAge}; Secure`;

      res.setHeader('Set-Cookie', [authCookie, loginCookie]);
      return res.status(200).json({ success: true });
    }

    return res.status(401).json({ error: 'Invalid password' });
  } catch (err) {
    console.error('Auth error:', err);
    return res.status(500).json({ error: err.message });
  }
}
