import { createSlice } from "@reduxjs/toolkit";

// Define the initial state using that type
const initialState = {
  token: ""
};

export const counterSlice = createSlice({
  name: "counter",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // sono tutte le possibili azioni che posso effettuare con lo stato
  reducers: {
    setToken: (state, action) => {
        state.token = action.payload
    },
  },
});

export const { increment, decrement, incrementByAmount, reset } = counterSlice.actions;
