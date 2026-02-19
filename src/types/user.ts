export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  department_id: number;
  role: string; // e.g., 'employee', 'manager', 'admin'
}
