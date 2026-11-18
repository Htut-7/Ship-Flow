import { auth } from "@/auth";
import React from "react";
import ROUTES from "@/ROUTES";
import { redirect } from "next/navigation";
import Logout from "@/components/Logout";

async function page() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect(ROUTES.LOGIN);
  }
  console.log(session);

  return (
    <div>
      <p>{session?.user?.name}</p>
      <span>{session?.user?.email}</span>

      <Logout />
    </div>
  );
}

export default page;
