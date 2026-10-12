/** Small request validators; each returns an error message or null. */

export const str = (value, { required = false, max = 500, min = 0 } = {}) => {
  if (value === undefined || value === null || value === '') return required ? 'is required' : null;
  if (typeof value !== 'string') return 'must be text';
  const v = value.trim();
  if (required && !v) return 'is required';
  if (v.length < min) return `must be at least ${min} characters`;
  if (v.length > max) return `must be at most ${max} characters`;
  return null;
};

export const oneOf = (value, options, { required = false } = {}) => {
  if (value === undefined || value === null || value === '') return required ? 'is required' : null;
  return options.includes(value) ? null : 'is not a valid option';
};

export const phone = (value, { required = false } = {}) => {
  if (!value) return required ? 'is required' : null;
  return /^\+?[0-9\s-]{6,20}$/.test(String(value)) ? null : 'is not a valid phone number';
};

export const email = (value, { required = false } = {}) => {
  if (!value) return required ? 'is required' : null;
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(value)) && String(value).length <= 200 ? null : 'is not a valid email';
};

/** Runs checks like { name: str(body.name, {...}) } and returns the first failure, or null. */
export const firstError = (checks) => {
  for (const [field, message] of Object.entries(checks)) {
    if (message) return `${field} ${message}`;
  }
  return null;
};

export const bool = (value) => value === true || value === 'true' || value === 'on';

export const list = (value) => {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string' && value) {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [value];
    } catch {
      return value.split(',').map((s) => s.trim()).filter(Boolean);
    }
  }
  return [];
};
