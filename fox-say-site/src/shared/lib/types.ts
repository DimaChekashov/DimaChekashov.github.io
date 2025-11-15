enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  MODERATOR = "MODERATOR",
}

export interface ILink {
  href: string;
  label: string;
}

export interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
  displayName?: string;
  avatarUrl?: string;
  bio?: string;
  role: Role;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
