export interface CustomerProfileFormValues {
  email: string;
  phone: string;
  fullName: string;
  username: string;
  gender: "male" | "female" | "other";
  profilePicture: File | null;
}

export interface OrganizerProfileFormValues extends CustomerProfileFormValues {
  companyName: string;
  companyAddress: string;
  eventCategory: string;
}
