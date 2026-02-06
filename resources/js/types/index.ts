export type * from './models';
export type { Auth, TwoFactorSetupData, TwoFactorSecretKey } from './auth';
export type * from './navigation';
export type * from './ui';

import type { Auth } from './auth';

export type SharedData = {
    name: string;
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
};
