import * as React from "react";
import { Metadata } from "next";

interface ISignInLayout {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Sign In",
  description: "Join to share your story",
};

const SignInLayout: React.FunctionComponent<ISignInLayout> = ({ children }) => {
  return <div>{children}</div>;
};

export default SignInLayout;
