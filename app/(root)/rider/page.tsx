import React from "react";
import Navbar from "@/components/Navbar";
import RiderBar from "./components/RiderBar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ROUTES from "@/ROUTES";

async function page() {

    const session=await auth();

    if(!session?.user?.email){
        throw new Error("Unauthorized");
    }

    const role=(session.user as typeof session.user & {role: string}).role;

    if(role !== "Rider"){
        redirect(ROUTES.LOGIN);
    }

  return (
    <div>
      <header className="border-b border-gray-200 bg-white">
        <Navbar />
      </header>

      <div>
        <RiderBar/>
      </div>
    </div>
  );
}

export default page;
