import { cookies } from "next/headers";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@lignerouge.local";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin1234";

export async function getAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get("admin-session")?.value === "authenticated";
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  if (cookieStore.get("admin-session")?.value !== "authenticated") return null;
  return {
    id: "local-admin",
    email: ADMIN_EMAIL,
    name: "Admin",
    role: "ADMIN" as const,
    avatar: null,
    bio: null,
  };
}

export async function isAdmin() {
  return getAdminSession();
}

export async function signIn(email: string, password: string) {
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return { success: true, user: { email, role: "ADMIN" } };
  }
  return { success: false, error: "Identifiants incorrects" };
}

export async function signUp(_email: string, _password: string, _name?: string) {
  return { success: false, error: "Inscription désactivée en mode local" };
}

export async function signOut() {
  // Cookie supprimé dans la route logout
}
