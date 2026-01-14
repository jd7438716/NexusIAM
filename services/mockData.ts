import { User, UserRole, Session, Transaction, FileItem, AuditLog, NotificationItem } from '../types';

// Mock Current User
export const MOCK_USER: User = {
  id: 'u-101',
  username: 'alex_admin',
  email: 'alex@nexus-iam.com',
  avatarUrl: 'https://picsum.photos/200/200',
  role: UserRole.ADMIN,
  mfaEnabled: true,
  phone: '+1 (555) 123-4567'
};

export const MOCK_USERS_LIST: User[] = [
  MOCK_USER,
  {
    id: 'u-102',
    username: 'sarah_design',
    email: 'sarah@nexus-iam.com',
    avatarUrl: 'https://picsum.photos/201/201',
    role: UserRole.USER,
    mfaEnabled: false,
    phone: '+1 (555) 987-6543'
  },
  {
    id: 'u-103',
    username: 'dev_mike',
    email: 'mike@nexus-iam.com',
    avatarUrl: 'https://picsum.photos/202/202',
    role: UserRole.USER,
    mfaEnabled: true,
    phone: '+1 (555) 456-7890'
  },
  {
    id: 'u-104',
    username: 'guest_user',
    email: 'guest@partner.com',
    avatarUrl: 'https://picsum.photos/203/203',
    role: UserRole.USER,
    mfaEnabled: false,
    phone: ''
  }
];

// Mock Sessions
export const MOCK_SESSIONS: Session[] = [
  { id: 's-1', ip: '192.168.1.1', device: 'Chrome / Windows 11', location: 'New York, USA', lastActive: 'Now', current: true },
  { id: 's-2', ip: '10.0.0.45', device: 'Safari / iPhone 14', location: 'New York, USA', lastActive: '2 hours ago', current: false },
  { id: 's-3', ip: '172.16.0.1', device: 'Firefox / MacOS', location: 'Boston, USA', lastActive: '3 days ago', current: false },
];

// Mock Transactions
export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 'tx-1', type: 'DEPOSIT', amount: 5000.00, status: 'COMPLETED', date: '2023-10-25' },
  { id: 'tx-2', type: 'TRANSFER', amount: 120.50, status: 'COMPLETED', date: '2023-10-24', recipient: 'bob@example.com' },
  { id: 'tx-3', type: 'WITHDRAWAL', amount: 1000.00, status: 'PENDING', date: '2023-10-22' },
  { id: 'tx-4', type: 'DEPOSIT', amount: 250.00, status: 'COMPLETED', date: '2023-10-20' },
  { id: 'tx-5', type: 'TRANSFER', amount: 50.00, status: 'FAILED', date: '2023-10-18', recipient: 'charlie@example.com' },
];

// Mock Files
export const MOCK_FILES: FileItem[] = [
  { id: 'f-1', name: 'Project_Specs_v2.pdf', size: '2.4 MB', type: 'PDF', uploadedAt: '2023-10-25' },
  { id: 'f-2', name: 'avatar_high_res.png', size: '4.1 MB', type: 'PNG', uploadedAt: '2023-10-24' },
  { id: 'f-3', name: 'backup_config.json', size: '12 KB', type: 'JSON', uploadedAt: '2023-10-20' },
  { id: 'f-4', name: 'Quarterly_Report.docx', size: '1.2 MB', type: 'DOCX', uploadedAt: '2023-10-15' },
  { id: 'f-5', name: 'presentation_draft.pptx', size: '15.5 MB', type: 'PPTX', uploadedAt: '2023-10-12' },
];

// Mock Audit Logs
export const MOCK_AUDIT_LOGS: AuditLog[] = [
  { 
    id: 'log-1', action: 'UPDATE_PROFILE', actor: 'alex_admin', ip: '192.168.1.1', timestamp: '2023-10-25 10:30:00',
    details: { before: '{"email": "alex@old.com"}', after: '{"email": "alex@nexus-iam.com"}' }
  },
  { 
    id: 'log-2', action: 'ENABLE_MFA', actor: 'alex_admin', ip: '192.168.1.1', timestamp: '2023-10-24 14:15:00',
    details: { before: '{"mfa": false}', after: '{"mfa": true}' }
  },
  { 
    id: 'log-3', action: 'DELETE_USER', actor: 'system_admin', ip: '10.2.1.5', timestamp: '2023-10-23 09:00:00',
    details: { before: '{"userId": "u-99"}', after: 'null' }
  },
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  { id: 'n-1', title: 'Login Alert', message: 'New login from Chrome / Windows', read: false, time: '10m ago' },
  { id: 'n-2', title: 'Wallet Update', message: 'Deposit of $5,000.00 received', read: true, time: '1h ago' },
];

// Mock Invitations
export const MOCK_INVITES = [
    { id: 'inv-1', code: 'NEXUS-8821-XDAW', status: 'USED', usedBy: 'sarah_design', date: '2023-10-01' },
    { id: 'inv-2', code: 'NEXUS-9912-BBQA', status: 'ACTIVE', usedBy: null, date: '2023-10-20' },
    { id: 'inv-3', code: 'NEXUS-1234-ABCD', status: 'EXPIRED', usedBy: null, date: '2023-09-15' },
];

// Mock Chat
export const MOCK_CONTACTS = [
    { id: 'c-1', name: 'Support Team', avatar: 'https://ui-avatars.com/api/?name=Support&background=0D8ABC&color=fff', online: true, lastMsg: 'How can I help you?' },
    { id: 'c-2', name: 'Sarah Design', avatar: 'https://picsum.photos/201/201', online: false, lastMsg: 'The files are ready.' },
    { id: 'c-3', name: 'Dev Mike', avatar: 'https://picsum.photos/202/202', online: true, lastMsg: 'Can we sync later?' },
];

export const MOCK_MESSAGES = [
    { id: 'm-1', senderId: 'c-1', text: 'Hello! Welcome to Nexus IAM.', time: '10:00 AM' },
    { id: 'm-2', senderId: 'me', text: 'Hi, I have a question about my wallet.', time: '10:05 AM' },
    { id: 'm-3', senderId: 'c-1', text: 'Sure, what seems to be the issue?', time: '10:06 AM' },
];

// Service Helpers
export const simulateDelay = (ms: number = 800) => new Promise(resolve => setTimeout(resolve, ms));
