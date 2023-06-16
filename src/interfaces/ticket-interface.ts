export interface ticket {
  id: number;
  org_id: number;
  user_id: number;
  department: number;
  guest_name: string;
  guest_email: string;
  agent_id: number;
  access: string;
  type: number;
  status: number;
  priority: number;
  date: Date;
  last_update: Date;
  subject: string;
  content: string;
  files: string;
  transferred_from: string;
  rating: number;
  rating_msg: string;
}
