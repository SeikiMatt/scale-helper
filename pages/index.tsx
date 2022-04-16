import React, { useState } from "react";
import Head from "next/head";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import Select from "react-select";
import { generateScale, normalizePitch } from "../utils/musicalScales";

const scalesToGenerate = [0, 2, 4, 5, 7, 9, 11];
let allMajorScales: any[] = [];

scalesToGenerate.forEach((e) => {
  for (let mode = 0; mode < 1; mode++) {
    allMajorScales = [
      ...allMajorScales,
      generateScale({ root: normalizePitch(e - 1), mode, notes: "flat" }),
    ];
    allMajorScales = [
      ...allMajorScales,
      generateScale({ root: normalizePitch(e), mode, notes: "natural" }),
    ];
    allMajorScales = [
      ...allMajorScales,
      generateScale({
        root: normalizePitch(e + 1),
        mode,
        notes: "sharp",
      }),
    ];
  }
});

const optionsScales = allMajorScales.map((e, k) => ({ value: k, label: e[0] }));

export default function Home() {
  const [currentScale, setCurrentScale] = useState(0);

  const handleCurrentScaleChange = (e: any) => setCurrentScale(e.value);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>
        <h1 className={"text-5xl"}>Scale Helper</h1>
        <p>Visualize scales on your instrument.</p>
        <div>
          <Select options={optionsScales} onChange={handleCurrentScaleChange} />
        </div>
        <div>
          <p>
            {allMajorScales[currentScale].map((e: string) => (
              <button className="text-2xl py-2 px-4">{e}</button>
            ))}
          </p>
        </div>
        <div className="w-screen">
          <div className="flex fixed">
            <div className="bg-black h-40 w-8 mx-0.5  flex flex-col-reverse text-center text-white">
              C
            </div>
            <div className="bg-black h-40 w-8 mx-0.5  flex flex-col-reverse text-center text-white">
              D
            </div>
            <div className="bg-black h-40 w-8 mx-0.5  flex flex-col-reverse text-center text-white">
              E
            </div>
            <div className="bg-black h-40 w-8 mx-0.5  flex flex-col-reverse text-center text-white">
              F
            </div>
            <div className="bg-black h-40 w-8 mx-0.5  flex flex-col-reverse text-center text-white">
              G
            </div>
            <div className="bg-black h-40 w-8 mx-0.5  flex flex-col-reverse text-center text-white">
              A
            </div>
            <div className="bg-black h-40 w-8 mx-0.5  flex flex-col-reverse text-center text-white">
              B
            </div>
          </div>
          <div className="flex fixed">
            <div className="bg-red-500 h-24 w-6 ml-6 flex flex-col-reverse text-center text-white">
              C♯
            </div>
            <div className="bg-red-500 h-24 w-6 ml-3 flex flex-col-reverse text-center text-white">
              D♯
            </div>
            <div className="bg-red-500 h-24 w-6 ml-12 flex flex-col-reverse text-center text-white">
              F♯
            </div>
            <div className="bg-red-500 h-24 w-6 ml-3 flex flex-col-reverse text-center text-white">
              G♯
            </div>
            <div className="bg-red-500 h-24 w-6 ml-3 flex flex-col-reverse text-center text-white">
              A♯
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
