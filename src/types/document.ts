export interface Document {
  id: number;
  title: string;
  description: string;
  file_name: string;
  file_path: string;
  file_type: string;
  file_size: number;
  category_id: number;
  department_id: number;
  uploaded_by: number;
  access_level: string;
  download_count: number;
  created_at: string;
  updated_at: string;
}