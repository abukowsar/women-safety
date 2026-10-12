// Keep in sync with ReportType in src/types/index.ts and topic ids in src/data/topics.ts.
export const COMPLAINT_TYPES = [
  'Sexual Violence',
  'Domestic Violence',
  'Dowry Abuse',
  'Child Marriage',
  'Sexual Harassment',
  'Cyberstalking',
  'Deepfake',
  'Image-Based Abuse',
  'Online Harassment',
  'Identity Theft',
  'Online Threats',
  'Other',
];

export const COMPLAINT_STATUSES = ['pending', 'investigating', 'resolved', 'dismissed'];

export const TOPICS = [
  'mental-health',
  'suicide-prevention',
  'sexual-violence',
  'domestic-violence',
  'dowry',
  'child-marriage',
  'harassment',
  'online-safety',
  'other',
];

export const SAFE_TIMES = ['morning', 'afternoon', 'evening', 'anytime'];
export const LANGUAGES = ['bn', 'en', 'hi', 'ur', 'ne', 'si', 'dv', 'ps', 'dz'];
export const CALLBACK_STATUSES = ['new', 'contacted', 'closed'];

export const VOLUNTEER_SKILLS = ['counselling', 'legal', 'medical', 'tech', 'translation', 'outreach', 'other'];
export const AVAILABILITY = ['weekdays', 'weekends', 'evenings', 'flexible'];
export const VOLUNTEER_STATUSES = ['new', 'approved', 'declined'];

export const ROLES = ['admin', 'law_enforcement', 'ngo_support'];
