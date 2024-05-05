import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      const { name, value } = action.payload;
      state.formData = {
        ...state.formData, 
        [name]: value 
      };
    },
    toggleCheckbox: (state) => {
      state.formData = {
        ...state.formData, 
        urgentRequest: !state.formData.urgentRequest 
      };
    },
    uploadImage: (state, action) => {
      const { name, value } = action.payload;
      console.log("🚀 ~ name, value:", name, value)
      state.formData = {
        ...state.formData, 
        [name]: value 
      };
    },
    nextStep: (state) => {
      state.step += 1;
      if (state.step === 2) {
        state.formData = {
          ...state.formData, 
          nationalityDuplicate: state.formData.nationality, 
          visaTypeDuplicate: state.formData.visaType,
          passportTypeDuplicate: state.formData.passportType 
        };
      }
    },
    prevStep: (state) => {
      state.step -= 1;
    },
    submitForm: (state) => {
      // handle form submission, e.g., making an API call
    },
  },
});

export const {
  updateFormData,
  toggleCheckbox,
  uploadImage,
  nextStep,
  prevStep,
} = formSlice.actions;
export default formSlice.reducer;
