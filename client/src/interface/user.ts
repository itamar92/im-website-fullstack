

export interface User {
  id?: number;
  userName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  
  }

  const initialState: User = {
    id: 0,
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    
  };