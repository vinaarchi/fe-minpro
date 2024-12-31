export interface CustomerProfileFormValues {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: "male" | "female" | "other";
  profilePicture: File | null;
}

export interface OrganizerProfileFormValues extends CustomerProfileFormValues {
  companyName: string;
  companyAddress: string;
  eventCategory: string;
}
