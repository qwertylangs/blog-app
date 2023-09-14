import { FeatureFlags } from '@/shared/types/featureFlags';

let featureFlags: FeatureFlags;

export const setFeatureFlags = (flags?: FeatureFlags) => {
  if (!flags) {
    return;
  }
  featureFlags = flags;
};

export const getFeatureFlag = (flag: keyof FeatureFlags) => {
  return featureFlags[flag];
};
