export interface User{
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
}

export interface userResponse{
  users:User[]
}