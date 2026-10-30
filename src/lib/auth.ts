import crypto from 'node:crypto';

export const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'dina2026!#climate';
export const AUTH_COOKIE_NAME = 'dina_cms_session';

const SECRET = process.env.ADMIN_SECRET || 'dina-yazdani-cms-auth-secret-key-2026-salt';

export function createSessionToken(username: string): string {
  const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days validity
  const payload = `${username}:${expiresAt}`;
  const hmac = crypto.createHmac('sha256', SECRET).update(payload).digest('hex');
  return Buffer.from(`${payload}:${hmac}`).toString('base64url');
}

export function verifySessionToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, 'base64url').toString('utf-8');
    const [username, expiresAtStr, hmac] = decoded.split(':');
    if (!username || !expiresAtStr || !hmac) return false;

    const expiresAt = Number(expiresAtStr);
    if (isNaN(expiresAt) || Date.now() > expiresAt) return false;

    const payload = `${username}:${expiresAt}`;
    const expectedHmac = crypto.createHmac('sha256', SECRET).update(payload).digest('hex');

    if (hmac.length !== expectedHmac.length) return false;
    return crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(expectedHmac));
  } catch {
    return false;
  }
}
