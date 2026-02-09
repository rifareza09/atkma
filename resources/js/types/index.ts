export type * from './atk';
export type * from './models';
export type { Auth, TwoFactorSetupData, TwoFactorSecretKey } from './auth';
export type * from './navigation';
export type * from './ui';

import type { Auth } from './auth';
import type { Notification } from './models';

export type SharedData = {
    name: string;
    auth: Auth;
    sidebarOpen: boolean;
    notifications?: Notification[];
    unread_notifications_count?: number;
    [key: string]: unknown;
};
