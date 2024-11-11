import cn from "classnames";
import Image from "next/image";
import Link from "next/link";

type Props = {
   title: string;
   src: string;
   slug?: string;
   loading?: "lazy" | "eager";
   sizes?: string;
};

const CoverImage = ({ title, src, slug, loading = "lazy", sizes = "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw" }: Props) => {
   const image = (
      <Image
         src={src}
         alt={`Cover Image for ${title}`}
         className={cn("shadow-sm w-full h-auto", {
            "hover:shadow-lg transition-shadow duration-200": slug,
         })}
         loading={loading}
         width={1300}
         height={630}
         sizes={sizes}
      />
   );
   return (
      <div className="sm:mx-0">
         {slug ? (
            <Link href={`/posts/${slug}`} aria-label={title}>
               {image}
            </Link>
         ) : (
            image
         )}
      </div>
   );
};

export default CoverImage;
