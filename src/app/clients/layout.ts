export const dynamic = "force-dynamic";

import { requireRole } from "@/lib/core/session";
import { ReactNode } from "react";


interface ClinetLayoutProps {
  children: ReactNode;
}

const ClinetLayout = async ({
  children,
}: ClinetLayoutProps): Promise<ReactNode> => {
  await requireRole("client");

  return children;
};

export default ClinetLayout;