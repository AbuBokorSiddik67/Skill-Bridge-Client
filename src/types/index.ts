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

export interface ITutorProfile {
  userId: string;
  aboutTutor: string;
  sessionPrice?: number;   
  experienceYears?: number; 
  education?: string;     
}
export interface ITutorResponse {
  success: boolean;
  message?: string;
  data: ITutorProfile;
}

export interface IBooking {
  tutorId: string;
  studentId: string;
  categoryId: string;
  startDate: string | Date; // ISO String format usually
  endDate: string | Date;
  totalPrice: number;
  location: string;
  notes?: string; // Optional because user might not provide notes
  paymentMethod: "CASH" | "ONLINE" | "BKASH" | "NAGAD"; // Literal types for better safety
  meetingLink?: string; // Optional if it's an offline tuition
}

export interface IReview {
  tutorId: string;
  studentId: string;
  rating: number; 
  comment: string;
}