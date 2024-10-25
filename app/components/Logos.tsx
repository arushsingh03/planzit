import Image from "next/image";
import GitLogo from "@/public/github.svg";
import VercelLogo from "@/public/vercel.svg";
import NylasLogo from "@/public/nylas-logo.png";
import NextLogo from "@/public/nextjs-logo.svg";
import GoogleTextLogo from "@/public/googleText.png";

export function Logos() {
  return (
    <div className="py-10">
      <h2 className="text-center text-lg font-medium leading-7">
        Trusted by industry leaders globally
      </h2>
      <div className="mt-10 grid max-w-lg mx-auto grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
        <Image
          src={NylasLogo}
          alt="Nylas"
          className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 dark:invert"
        />
        <Image
          src={NextLogo}
          alt="Next"
          className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 dark:invert"
        />
        <Image
          src={VercelLogo}
          alt="Vercel"
          className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 dark:invert"
        />
        <Image
          src={GitLogo}
          alt="GitHub"
          className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 dark:invert"
        />
        <Image
          src={GoogleTextLogo}
          alt="Google"
          className="col-span-2 max-h-13 w-full object-cover lg:col-span-1 dark:invert"
        />
      </div>
    </div>
  );
}
