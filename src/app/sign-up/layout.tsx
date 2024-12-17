import * as React from "react";
import { Metadata } from "next";

interface ISignUpLayout {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Join to share your story",
};

const SignUpLayout: React.FunctionComponent<ISignUpLayout> = ({ children }) => {
  return <div>{children}</div>;
};

export default SignUpLayout;
