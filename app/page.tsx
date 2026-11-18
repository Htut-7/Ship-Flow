import { auth } from '@/auth'
import ROUTES from '@/ROUTES';
import { redirect } from 'next/navigation';

async function Page() {
  const session=await auth();


console.log("Google session:", session);
console.log("Session user:", session?.user);

  if(!session?.user?.email){
    redirect(ROUTES.LOGIN);
  }

  const role=(session.user as typeof session.user & {role: string}).role;

  switch (role){
    case "Customer":
      redirect(ROUTES.CUSTOMER);

    case "Admin":
      redirect(ROUTES.ADMIN);

    case "Rider":
      redirect(ROUTES.RIDER);

    default:
      redirect(ROUTES.LOGIN);
  }
}

export default Page;