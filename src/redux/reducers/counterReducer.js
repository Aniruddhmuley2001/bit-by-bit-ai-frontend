// import { createSlice } from '@reduxjs/toolkit';

// // Initial state
// const initialState = {
//   value: 0, // Default counter value
// };

// // Create the slice
// export const counterSlice = createSlice({
//   name: 'counter', 
//   initialState,
//   reducers: {
//     // Reducer functions
//     increment: (state) => {
//       state.value += 1; // Directly mutate state (Immer handles immutability)
//     },
//     decrement: (state) => {
//       state.value -= 1;
//     },
//     incrementByAmount: (state, action) => {
//       state.value += action.payload; // Use action payload
//     },
//   },
// });

// // Export actions
// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// // Export reducer
// export default counterSlice.reducer;
