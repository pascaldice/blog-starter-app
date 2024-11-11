import { getAllUsers, getUserById, getUserPhotoById } from "@/lib/api";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

type Props = {
   params: Promise<{
      empId: string;
   }>;
};

export default async function Page(props: Props) {
   const params = await props.params;
   const user = await getUserById(params.empId);
   const image = await getUserPhotoById(params.empId);
   if (!user) return notFound();

   return (
      <main className="flex flex-col items-center">
         {/* <Image alt="user-picture" src={getUserImageUrl(user.empId)}></Image> */}
         {image && <Image alt="user-picture" src={image}></Image>}
         <div>{user.empNm}</div>
         <div>{user.enterYmd}</div>
         <div>{user.titleType}</div>
         <div>{user.orgNm}</div>
         <div>{user.headOrgNm}</div>
      </main>
   );
}

export async function generateMetadata(props: Props): Promise<Metadata> {
   const params = await props.params;
   const user = await getUserById(params.empId);
   if (!user) return notFound();

   const title = `${user.empNm} ${user.orgNm} | Daewooenc User Info`;

   return {
      title,
      openGraph: {
         title,
         //  images: [post.ogImage.url],
      },
   };
}

export async function generateStaticParams() {
   return (await getAllUsers()).map((o) => ({
      empId: o.empId,
   }));
}
