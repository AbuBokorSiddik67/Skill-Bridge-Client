export interface IUser {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "USER" | "TUTOR"; 
  status: "ACTIVE" | "INACTIVE" | "BLOCKED";
  phone: string;
  address: string;
  bio: string | null;
  imageLink: string | undefined;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IUserResponse {
  success: boolean;
  message: string;
  data: IUser; 
}