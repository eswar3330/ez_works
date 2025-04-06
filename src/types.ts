export interface Service {
    id: number;
    name: string;
    description: string;
    category: string;
    icon: string;
  }
  
  export interface USP {
    id: number;
    title: string;
    description: string;
    link: string;
  }
  
  export interface FormData {
    name: string;
    email: string;
    phone: string;
    company: string;
    service: string;
    message: string;
  }