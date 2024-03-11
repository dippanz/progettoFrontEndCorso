import { createSlice } from "@reduxjs/toolkit";

// Define the initial state using that type
const initialState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // sono tutte le possibili azioni che posso effettuare con lo stato
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    reset: (state) => {
      state.value = 0
    }
  },
});

export const { increment, decrement, incrementByAmount, reset } = counterSlice.actions;
