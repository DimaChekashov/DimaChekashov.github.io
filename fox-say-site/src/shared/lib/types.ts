enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  MODERATOR = "MODERATOR",
}

enum PostStatus {
  PUBLISHED = "PUBLISHED",
  DRAFT = "DRAFT",
  ARCHIVED = "ARCHIVED",
}

enum CommentStatus {
  APPROVED = "APPROVED",
  PENDING = "PENDING",
  SPAM = "SPAM",
  DELETED = "DELETED",
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
  displayName: string;
  avatarUrl: string;
  bio: string;
  role: Role;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  authorId: number;
  status: PostStatus;
  commentStatus: boolean;
  publishedAt: string;
  categories: ICategory[];
  tags: ITag[];
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
}

export interface ICategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  parentId: number;
  parent: ICategory;
  children: ICategory[];
  posts: IPost[];
  createdAt: string;
}

export interface ITag {
  id: number;
  name: string;
  slug: string;
  posts: ITag[];
  createdAt: string;
}

export interface IComment {
  id: number;
  content: string;
  postId: number;
  post: IPost;
  userId: number;
  user: IUser;
  parentId: number;
  parent: IComment;
  children: IComment[];
  status: CommentStatus;
  createdAt: string;
  updatedAt: string;
}
