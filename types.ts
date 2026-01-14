export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatarUrl: string;
  role: UserRole;
  mfaEnabled: boolean;
  phone?: string;
}

export interface Session {
  id: string;
  ip: string;
  device: string;
  location: string;
  lastActive: string;
  current: boolean;
}

export interface Transaction {
  id: string;
  type: 'DEPOSIT' | 'WITHDRAWAL' | 'TRANSFER';
  amount: number;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
  date: string;
  recipient?: string;
}

export interface FileItem {
  id: string;
  name: string;
  size: string;
  type: string;
  uploadedAt: string;
}

export interface AuditLog {
  id: string;
  action: string;
  actor: string;
  ip: string;
  timestamp: string;
  details: {
    before: string;
    after: string;
  };
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  read: boolean;
  time: string;
}
