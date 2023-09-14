import { FeatureFlags } from '@/shared/types/featureFlags';
import { UserRole } from '../consts/userConsts';
import { JsonSettings } from './jsonSettings';

export interface User {
  id: string;
  username: string;
  avatar?: string;
  role?: UserRole[];
  features?: FeatureFlags;
  jsonSettings?: JsonSettings;
}

export interface UserSchema {
  authData?: User;

  _inited: boolean;
}
