import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      const { name, value } = action.payload;
      state.formData = {
        ...state.formData, // Spread the existing formData object
        [name]: value // Update the specified field
      };
    },
    toggleCheckbox: (state) => {
      state.formData = {
        ...state.formData, // Spread the existing formData object
        urgentRequest: !state.formData.urgentRequest // Toggle the urgentRequest field
      };
    },
    nextStep: (state) => {
      state.step += 1;
      if (state.step === 2) {
        state.formData = {
          ...state.formData, // Spread the existing formData object
          nationalityDuplicate: state.formData.nationality, // Update nationalityDuplicate field
          visaTypeDuplicate: state.formData.visaType, // Update visaTypeDuplicate field
          passportTypeDuplicate: state.formData.passportType // Update passportTypeDuplicate field
        };
      }
    },
    prevStep: (state) => {
      state.step -= 1;
    },
    submitForm: (state) => {
      // handle form submission, e.g., making an API call
      // No need to modify state here
    },
  },
});

export const {
  updateFormData,
  toggleCheckbox,
  nextStep,
  prevStep,
} = formSlice.actions;
export default formSlice.reducer;
