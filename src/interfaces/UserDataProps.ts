export interface UserDataProps {
  password?: string;
  user?: {
    id?: string;
    name: string;
    login: string;
    picture?: string;
  };
}
