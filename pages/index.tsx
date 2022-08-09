import React, { useState, useEffect } from "react";
import Head from "next/head";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import Piano from "components/Instruments/Piano";
import Guitar from "components/Instruments/Guitar";
import Select from "components/Select";
import { generateHeptatonicScale } from "utils/musicalScales";
import { pitchToNote } from "utils/musicalScales";
import * as Tone from "tone";

export default function Home() {
  useEffect(() => {
    const synth = new Tone.Synth().toDestination();
  }, []);

  const instrumentTypes = [
    { label: "Piano", value: "0" },
    { label: "Guitar", value: "1" },
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
  const [currScale, setCurrScale] = useState({
    root: 0,
    notes: generateHeptatonicScale({ root: 0, mode: 0 }),
    degree: 0,
    mode: 0,
  });

  const handleInstrumentChange = (e: React.FormEvent<HTMLSelectElement>) =>
    setCurrInstrument(parseInt(e.currentTarget.value));

  const handleScaleTypeChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const value = parseInt(e.currentTarget.value);
    setCurrScaleType([...scales[value]]);
    if (value === 0) {
      setCurrScale({
        root: 0,
        notes: generateHeptatonicScale({ root: 0, mode: 0 }),
        degree: 0,
        mode: 0,
      });
    } else {
      setCurrScale({
        root: 9,
        notes: generateHeptatonicScale({ root: 9, mode: 1 }),
        degree: 0,
        mode: 1,
      });
    }
  };

  const handleScaleChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const dataSplit = e.currentTarget.value.split("-");
    const root = parseInt(dataSplit[0]);
    const degree = parseInt(dataSplit[1]);
    const mode = parseInt(dataSplit[2]);
    setCurrScale({
      root,
      degree,
      mode,
      notes: generateHeptatonicScale({ root, mode }),
    });
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
      <Navbar />
      <main>
        <h1 className={"text-5xl"}>Scale Helper</h1>
        <p>Visualize scales on your instrument.</p>
        <div>
          <div className="flex justify-center w-full mt-8 mb-4">
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
        </div>

        <div>
          {currScale.notes.map((note, k) => (
            <span
              key={"scalenotedisplay-" + k}
              className={`text-3xl mx-4 font-semibold${
                k === 0 ? " text-purple-600" : " text-blue-600"
              }`}
            >
              {pitchToNote({ pitch: note, degree: currScale.degree })}
            </span>
          ))}
          <span className="text-3xl mx-4 font-semibold text-purple-600">
            {pitchToNote({
              pitch: currScale.notes[0],
              degree: currScale.degree,
            })}
          </span>
        </div>

        {currInstrument === 0 ? (
          <Piano scale={currScale} />
        ) : currInstrument === 1 ? (
          <Guitar
            scale={currScale}
            options={{
              strings: 6,
              frets: 15,
              tuning: [4, 9, 2, 7, 11, 4],
            }}
          />
        ) : null}
      </main>
      <Footer />
    </div>
  );
}
