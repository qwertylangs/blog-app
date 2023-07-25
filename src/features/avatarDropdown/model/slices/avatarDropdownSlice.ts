import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AvatarDropdownSchema } from '../types/avatarDropdownSchema';

const initialState: AvatarDropdownSchema = {
  
};

export const avatarDropdownSlice = createSlice({
  name: 'avatarDropdown',
  initialState,
  reducers: {
    template: (state, action: PayloadAction<string>) => {
        
    },
  },
  // extraReducers: (builder) => {
//     builder
//         .addCase(, (state) => {
//             state.error = undefined;
//             state.isLoading = true;
//         })
//         .addCase(, (state) => {
//             state.isLoading = false;
//         })
//         .addCase(, (state, action) => {
//             state.isLoading = false;
//             state.error = action.payload;
//         });
  // },
});

export const { actions: avatarDropdownActions } = avatarDropdownSlice;
export const { reducer: avatarDropdownReducer } = avatarDropdownSlice;