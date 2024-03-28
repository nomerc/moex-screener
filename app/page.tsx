import Link from "next/link";
import Image from "next/image";

export default async function Page() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Link
        href="/bonds"
        className=" flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <Image
          src={"/bond.jpg"}
          alt="MOEX Bonds"
          width={500}
          height={500}
          // blurDataURL="data:..."
          // placeholder="blur" // Optional blur-up while loading
          className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
        />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Облигации
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Ознакомьтсь со списком облигаций Московской биржи и выберите
            наиболее подходящие для Вас
          </p>
        </div>
      </Link>
    </div>
  );
}
