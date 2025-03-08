import { createSlice } from "@reduxjs/toolkit";

// Get initial values from sessionStorage (if available)
const initialState = {
  SubjectNumber: null,
  Sem: null,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setSessionData: (state, action) => {
      const { SubjectNumber, Sem } = action.payload;
      state.SubjectNumber = SubjectNumber;
      state.Sem = Sem;
      
      // Update sessionStorage when Redux state updates
      sessionStorage.setItem("SubjectNumber", SubjectNumber);
      sessionStorage.setItem("Sem", Sem);
    },
  },
});

export const { setSessionData } = sessionSlice.actions;
export default sessionSlice.reducer;
