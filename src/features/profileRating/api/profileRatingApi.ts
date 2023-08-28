import { Rating } from '@/entities/Rating';
import { rtkApi } from '@/shared/api/rtkApi';

interface GetProfileRatingProps {
  profileId: string;
  userId: string;
}

interface RateProfileProps extends GetProfileRatingProps {
  rate: number;
  feedback?: string;
}

const ProfileRatingApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getProfileRating: build.query<Rating[] | [], GetProfileRatingProps>({
      query: ({ profileId, userId }) => ({
        url: '/profile-ratings',
        params: {
          userId,
          profileId,
        },
      }),
    }),
    rateProfile: build.mutation<void, RateProfileProps>({
      query: (arg) => ({
        url: '/profile-ratings',
        method: 'POST',
        body: arg,
      }),
    }),
  }),
});

export const useProfileRating = ProfileRatingApi.useGetProfileRatingQuery;
export const useRateProfile = ProfileRatingApi.useRateProfileMutation;
