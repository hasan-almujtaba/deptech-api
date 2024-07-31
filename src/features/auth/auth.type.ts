export type TLoginRequestBody = {
  email: string;
  password: string;
};

export type TRegisterRequestBody = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  gender: "male" | "female" | "other";
  password: string;
};

export type TUpdateProfileRequestBody = {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  gender: "male" | "female" | "other";
};
