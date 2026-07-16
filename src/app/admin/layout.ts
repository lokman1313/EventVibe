export const dynamic = "force-dynamic";

import { requireRole } from "@/lib/core/session";
import { ReactNode } from "react";


interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = async ({
  children,
}: AdminLayoutProps): Promise<ReactNode> => {
  await requireRole("admin");

  return children;
};

export default AdminLayout;