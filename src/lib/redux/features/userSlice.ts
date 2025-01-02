import { createSlice } from "@reduxjs/toolkit";

interface IUser {
  id: string;
  fullname: string;
  username: string;
  email: string;
  isAuth?: boolean;
  imgprofile?: string;
  role?: string;
}

const initialData: IUser = {
  id: "",
  fullname: "",
  username: "",
  email: "",
  isAuth: false,
  imgprofile: "",
  role: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: { ...initialData },
  reducers: {
    setSignIn: (initialState, action) => {
      console.log("CHECK ACTION REDUX FROM USER SIGNIN:", action);

      return { ...action.payload };
    },
    setSignOut: () => {
      return { ...initialData };
    },
    setUpdateProfile: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setSignIn, setSignOut, setUpdateProfile } = userSlice.actions;

export default userSlice.reducer;
