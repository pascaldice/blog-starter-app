import { generatePhotos, getAllUsers, getUserPhotoById } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
   const users = await getAllUsers();
   await generatePhotos(users);
   const base64Arr: (string | undefined)[] = [];
   for (const u of users) {
      base64Arr.push(await getUserPhotoById(u.empId));
   }

   return (
      <section className="flex flex-col p-10 gap-12">
         <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">User List.</h1>
         <div className="grid grid-cols-2 md:grid-cols-4 md:gap-x-4 lg:grid-cols-6 gap-y-5 md:gap-y-8 ">
            {users.map((u, i) => {
               return (
                  <div key={i} className="text-center">
                     <Link href={`/users/${u.empId}`}>
                        {/* <Image alt="user-picture" width={150} height={200} src={getUserImageUrl(u.empId)} className="m-auto"></Image> */}
                        {base64Arr[i] && <Image alt="user-picture" width={150} height={200} src={base64Arr[i]}></Image>}
                        {u.empNm}
                     </Link>
                  </div>
               );
            })}
         </div>
      </section>
   );
}

export function generateMetadata() {
   const title = "Daewooenc User Info.";
   return {
      title,
      openGraph: {
         title,
      },
   };
}
