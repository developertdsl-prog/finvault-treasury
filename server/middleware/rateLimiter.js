const requestCounts = new Map();

const rateLimiter = (req, res, next) => {
  const ip = req.ip || '127.0.0.1';
  const now = Date.now();
  const windowMs = 60 * 1000;
  const limit = 500;

  const current = requestCounts.get(ip) || { count: 0, resetTime: now + windowMs };
  if (now > current.resetTime) {
    current.count = 1;
    current.resetTime = now + windowMs;
  } else {
    current.count++;
  }

  requestCounts.set(ip, current);

  if (current.count > limit) {
    return res.status(429).json({
      success: false,
      error: 'Rate limit exceeded: High-frequency treasury transaction throttled.'
    });
  }

  next();
};

module.exports = rateLimiter;
