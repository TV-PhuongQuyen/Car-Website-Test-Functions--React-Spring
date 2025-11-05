import { jwtDecode } from "jwt-decode";
import { getTokened } from "./authService";
export const hasRole = (role) => {
  const token = getTokened();
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);

    const scopes = decoded.scope ? decoded.scope.split(" ") : [];

    return scopes.includes(role);
  } catch {
    return false;
  }
};