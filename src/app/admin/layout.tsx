import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Administration | Ligne Rouge",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const isAuthenticated = await getAdminSession();

  if (!isAuthenticated) {
    redirect("/login");
  }

  return <>{children}</>;
}
