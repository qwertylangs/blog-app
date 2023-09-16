import { ReactElement } from 'react';
import { FeatureFlags } from '@/shared/types/featureFlags';
import { getFeatureFlag } from '../setGetFeatureFlags';

interface ToggleFeaturesProps {
  name: keyof FeatureFlags;
  on: ReactElement;
  off: ReactElement;
}

export const ToggleFeatures = ({ name, off, on }: ToggleFeaturesProps) => {
  if (getFeatureFlag(name)) {
    return on;
  }

  return off;
};
