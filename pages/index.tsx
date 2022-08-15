import React, { useState } from "react";
import Head from "next/head";
import Footer from "components/Footer";
import Piano from "components/Instruments/Piano";
import Stringed from "components/Instruments/Stringed";
import Select from "components/Select";
import { Scale, SharpsOrFlats } from "utils/musicalScales";

export default function Home() {
  const instrumentTypes = [
    { label: "Piano", value: "0" },
    { label: "Guitar", value: "1" },
    { label: "Electric Bass", value: "2" },
  ];

  const scaleTypes = [
    { label: "Major", value: "0" },
    { label: "Minor", value: "1" },
  ];

  const scales = [
    [
      { label: "C", value: "0-0-0" },
      { label: "C♯", value: "1-2-0" },
      { label: "D♭", value: "1-1-0" },
      { label: "D", value: "2-2-0" },
      { label: "E♭", value: "3-1-0" },
      { label: "E", value: "4-2-0" },
      { label: "F", value: "5-1-0" },
      { label: "F♯", value: "6-2-0" },
      { label: "G♭", value: "6-1-0" },
      { label: "G", value: "7-2-0" },
      { label: "A♭", value: "8-1-0" },
      { label: "A", value: "9-2-0" },
      { label: "B♭", value: "10-1-0" },
      { label: "B", value: "11-2-0" },
      { label: "C♭", value: "11-1-0" },
    ],
    [
      { label: "A", value: "9-0-1" },
      { label: "B♭", value: "10-1-1" },
      { label: "B", value: "11-2-1" },
      { label: "C", value: "0-1-1" },
      { label: "C♯", value: "1-2-1" },
      { label: "D", value: "2-1-1" },
      { label: "D♯", value: "3-2-1" },
      { label: "E♭", value: "3-1-1" },
      { label: "E", value: "4-2-1" },
      { label: "F", value: "5-1-1" },
      { label: "F♯", value: "6-2-1" },
      { label: "G", value: "7-1-1" },
      { label: "G♯", value: "8-2-1" },
    ],
  ];

  const [currInstrument, setCurrInstrument] = useState(0);
  const [currScaleType, setCurrScaleType] = useState([...scales[0]]);
  const [currScale, setCurrScale] = useState(
    new Scale({
      root: 0,
      sharpsOrFlats: SharpsOrFlats.Natural,
      mode: 0,
    })
  );

  const handleInstrumentChange = (e: React.FormEvent<HTMLSelectElement>) =>
    setCurrInstrument(parseInt(e.currentTarget.value));

  const handleScaleTypeChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const value = parseInt(e.currentTarget.value);
    setCurrScaleType([...scales[value]]);
    if (value === 0) {
      setCurrScale(
        new Scale({
          root: 0,
          sharpsOrFlats: SharpsOrFlats.Natural,
          mode: 0,
        })
      );
    } else {
      setCurrScale(
        new Scale({
          root: 9,
          sharpsOrFlats: SharpsOrFlats.Natural,
          mode: 5,
        })
      );
    }
  };

  const handleScaleChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const dataSplit = e.currentTarget.value.split("-");
    const root = parseInt(dataSplit[0]);
    const sharpsOrFlats = parseInt(dataSplit[1]);
    const mode = parseInt(dataSplit[2]);
    setCurrScale(
      new Scale({
        root,
        sharpsOrFlats,
        mode,
      })
    );
  };

  return (
    <div>
      <Head>
        <title>Scale Helper - Visualize scales on your instrument</title>
        <meta property="og:title" content="Scale Helper" />
        <meta
          property="og:description"
          content="Visualize scales on your musical instrument."
        />
        <meta property="og:url" content="https://scale-helper.vercel.app" />
        <meta
          property="og:image"
          content="https://scale-helper.vercel.app/meta-img.png"
        />

        <meta property="og:locale" content="en_US" />
        <meta property="og:locale:alternate" content="pt_BR" />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={"text-5xl mt-24"}>Scale Helper</h1>
        <p>Visualize scales on your instrument.</p>

        <div className="flex justify-center my-4">
          <Select
            className="w-32"
            onChange={handleInstrumentChange}
            options={instrumentTypes}
          />
          <Select
            className="w-32 mx-2"
            onChange={handleScaleTypeChange}
            options={scaleTypes}
          />
          <Select
            className="w-18"
            onChange={handleScaleChange}
            options={currScaleType}
          />
        </div>

        <div>
          {currScale.notes.map((note, k) => (
            <span
              key={"scalenotedisplay-" + k}
              className={`text-3xl mx-4 font-semibold${
                k === 0 ? " text-purple-600" : " text-blue-600"
              }`}
            >
              {Scale.pitchToNote({
                pitch: note,
                sharpsOrFlats: currScale.sharpsOrFlats,
              })}
            </span>
          ))}
          <span className="text-3xl mx-4 font-semibold text-purple-600">
            {Scale.pitchToNote({
              pitch: currScale.notes[0],
              sharpsOrFlats: currScale.sharpsOrFlats,
            })}
          </span>
        </div>

        {currInstrument === 0 ? (
          <Piano scale={currScale} />
        ) : currInstrument === 1 ? (
          <Stringed
            scale={currScale}
            options={{
              strings: 6,
              frets: 15,
              tuning: [
                { pitch: 4, octave: 4 },
                { pitch: 9, octave: 3 },
                { pitch: 2, octave: 3 },
                { pitch: 7, octave: 3 },
                { pitch: 11, octave: 2 },
                { pitch: 4, octave: 2 },
              ],
              instrument: "guitar-acoustic",
            }}
          />
        ) : currInstrument === 2 ? (
          <Stringed
            scale={currScale}
            options={{
              strings: 4,
              frets: 15,
              tuning: [
                { pitch: 4, octave: 2 },
                { pitch: 9, octave: 2 },
                { pitch: 2, octave: 1 },
                { pitch: 7, octave: 1 },
              ],
              instrument: "electric-bass",
            }}
          />
        ) : null}
      </main>
      <Footer />
    </div>
  );
}
