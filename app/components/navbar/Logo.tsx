'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <>
      <p onClick={() => router.push('/')} className="font-bold text-2xl text-yellow-900">Homes.Com</p>

      {/*<Image
      onClick={() => router.push('/')}
      className="hidden md:block cursor-pointer" 
      src="/images/logo.png" 
      height="100" 
      width="100" 
      alt="Logo" 
  />*/}
    </>
  );
}

export default Logo;
