import { ComponentType } from "react";

// Enum for roles (adjust based on your project's roles)
export enum RoleEnum {
  Guest = "Guest",
  Admin = "Admin",
  Instructor = "Instructor",
  Student = "Student",
}

// Define RouteConfig to expect optional layouts and a required component
export interface RouteConfig {
  path: string;
  importURL: string; 
  layout?: ComponentType | null;  // Optional layout, can be null or a component
  role: RoleEnum[];  // Role associated with the route
}