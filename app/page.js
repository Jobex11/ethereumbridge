"use client";
import Image from "next/image";
import Content from "./Content";
import TestComponent from "./TestComponent";

export default function Home() {
  return (
    <div className="w-full h-screen bg-gray-500">
      <div className="flex flex-col  justify-center items-center h-full w-full">
        <h2 className="my-5 text-xl text-white">ETH-RUNE Gateway</h2>
        <div className="bg-white p-6 w-[50%] h-[70%] rounded-lg  shadow-lg overflow-scroll">
          <Content />
        </div>
      </div>
    </div>
  );
}
