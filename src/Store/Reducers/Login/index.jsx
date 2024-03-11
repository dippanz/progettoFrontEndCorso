import { createSlice } from "@reduxjs/toolkit";

// Define the initial state using that type
const initialState = {
  token: "",
  dataExpiration: "",
  email: ""

};

export const counterSliceLogin = createSlice({
  name: "session",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // sono tutte le possibili azioni che posso effettuare con lo stato
  reducers: {
    setSession: (state, action) => {
        state.token = action.payload.token
        state.dataExpiration = action.payload.ttl
        state.email = action.payload.email
    },
    removeSession: (state) => {
        state.token = ""
        state.dataExpiration = ""
        state.email = ""
    }

  },
});

export const {setSession, removeSession  } = counterSliceLogin.actions;
