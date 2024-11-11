import { Post } from "@/interfaces/post";
import fs, { promises as afs } from "fs";
import matter from "gray-matter";
import { join } from "path";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
   return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string) {
   const realSlug = slug.replace(/\.md$/, "");
   const fullPath = join(postsDirectory, `${realSlug}.md`);
   const fileContents = fs.readFileSync(fullPath, "utf8");
   const { data, content } = matter(fileContents);

   return { ...data, slug: realSlug, content } as Post;
}

export function getAllPosts(): Post[] {
   const slugs = getPostSlugs();
   const posts = slugs
      .map((slug) => getPostBySlug(slug))
      // sort posts by date in descending order
      .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
   return posts;
}

export type User = { empId: string; empNm: string; titleType: string; enterYmd: string; orgNm: string; headOrgNm: string };

const ETLS_URL = "https://test.daewooenc.com/etls";
const BRIS_URL = "http://mbris.daewooenc.com/picture";
const users: User[] = [];

export async function getAllUsers(): Promise<User[]> {
   const res = await fetch(`${ETLS_URL}/v1/humanresource/getInfoGatePass`, { headers: { "Content-Type": "application/json+sua" } });
   const data = await res.json();

   if (!res.ok || !data || !Array.isArray(data.output)) return [];

   const users: User[] = Array.from(data.output).filter((o: any): o is User => {
      return "empId" in o && "empNm" in o && "titleType" in o && "enterYmd" in o && "orgNm" in o && "headOrgNm" in o;
   });
   return users.slice(0, 1500);
}

export async function getUserById(empId: string) {
   const users = await getAllUsers();
   return users.find((o) => o.empId === empId);
}

export async function getUserPhotoById(empId: string) {
   try {
      const image = await afs.readFile(`${USER_IMAGE_INNER_PATH}${empId}.jpeg`);
      return `data:image/jpeg;base64,${image.toString("base64")}`;
   } catch (e) {
      return;
   }
   // try {
   //    const res = await fetch(`${BRIS_URL}/${empId}`, {
   //       headers: { "User-Agent": "Morpheus/NT", "Content-Type": "application/json;charset=utf-8" },
   //    });
   //    // return URL.createObjectURL(await res.blob());
   //    const buffer = await res.arrayBuffer();
   //    const base64 = Buffer.from(buffer).toString("base64");
   //    const mimeType = res.headers.get("content-type") || "image/jpeg";
   //    return `data:${mimeType};base64,${base64}`;
   // } catch (e) {
   //    console.error(`error occured with getting ${empId} user image `, e);
   //    return undefined;
   // }
}

const USER_IMAGE_INNER_PATH = "./public/assets/users/";
export async function generatePhotos(users: User[]) {
   try {
      await afs.access(USER_IMAGE_INNER_PATH);
      await afs.rm(USER_IMAGE_INNER_PATH, { recursive: true, force: true });
      await afs.mkdir(USER_IMAGE_INNER_PATH, {});
   } catch (e) {
      console.error(e);
      await afs.mkdir(USER_IMAGE_INNER_PATH, {});
   }
   for (const u of users) {
      const url = `${USER_IMAGE_INNER_PATH}${u.empId}.jpeg`;
      try {
         await afs.access(url);
      } catch (e) {
         const res = await fetch(`${BRIS_URL}/${u.empId}`, {
            headers: { "User-Agent": "Morpheus/NT", "Content-Type": "application/json;charset=utf-8" },
         });
         const buffer = await res.arrayBuffer();
         afs.writeFile(`${USER_IMAGE_INNER_PATH}${u.empId}.jpeg`, Buffer.from(buffer));
      }
   }
}

const USER_IMAGE_PATH = "/assets/users/";
export function getUserImageUrl(empId: string) {
   return `${USER_IMAGE_PATH}${empId}.jpeg`;
}
