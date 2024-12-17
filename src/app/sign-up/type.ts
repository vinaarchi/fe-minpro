export interface ISignUpValue {
    fullname: string;
    username: string;
    email: string;
    password: string;
    role: "customer" | "organizer";
}