"use client";
import Image from "next/image";
import Content from "./Content";
import TestComponent from "./TestComponent";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="bg-white p-6 w-[50%] h-[50%] rounded-lg  shadow-lg">
        <Content />
      </div>
    </div>
  );
}
