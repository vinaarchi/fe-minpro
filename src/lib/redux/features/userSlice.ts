import { createSlice } from "@reduxjs/toolkit";

interface IUser {
  id: string;
  fullname: string;
  username: string;
  email: string;
  isAuth?: boolean;
  imgprofile?: string;
}

const initialData: IUser = {
  id: "",
  fullname: "",
  username: "",
  email: "",
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
    setUpdateProfile: (initialState, action) => {
      return { ...initialState, ...action.payload };
    },
  },
});

export const { setSignIn, setSignOut, setUpdateProfile } = userSlice.actions;

export default userSlice.reducer;
