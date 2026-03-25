// src/app/page.js
import Image from 'next/image';
import logo from '../../../public/gemot.svg';

export default function Home() {
  return (
    <div className="flex flex-row w-full h-full items-center justify-center gap-5">
      <Image
        src={logo}
        alt="My logo"
        width={100}
        height={100}
      />

      <h1 className="text-5xl text-red-700 font-bold mb-4">
        GBMOT
      </h1>
    </div>
  );
}

