import Link from "next/link";

const Page = () => {
  return (
    <div className="flex justify-center items-center flex-col">
      <p>Appの要素</p>
      <Link href="/about">About</Link>
    </div>
  );
};

export default Page;
