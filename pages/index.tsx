import React, { useState } from "react";
import Head from "next/head";
import Footer from "components/Footer";
import Piano from "components/Instruments/Piano";
import Stringed from "components/Instruments/Stringed";
import Select from "components/Select";
import { Scale } from "utils/musicalScales";

function reorderArrayFrom(arr: any[], index: number) {
  return arr.slice(index).concat(arr.slice(0, index));
}

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
    Scale.generateCircleOfInterval({
      root: 0,
      mode: 0,
      iterations: 7,
      intervals: Scale.intervalSequences.heptatonicNaturalMajor,
    }).sort((a, b) => a.root - b.root),
    reorderArrayFrom(
      Scale.generateCircleOfInterval({
        root: 0,
        mode: 5,
        iterations: 6,
        intervals: Scale.intervalSequences.heptatonicNaturalMajor,
      }).sort((a, b) => a.root - b.root),
      10
    ),
  ];

  const generateScaleOptions = (currScaleType: number) => {
    return scales[currScaleType].map((e, k) => {
      return {
        label: Scale.pitchToNote({
          pitch: e.root,
          sharpsOrFlats: e.sharpsOrFlats,
        }),
        value: String(k),
      };
    });
  };

  const [currInstrument, setCurrInstrument] = useState(0);
  const [currScaleType, setCurrScaleType] = useState(0);
  const [currScale, setCurrScale] = useState(scales[0][0]);
  const [currScaleOptions, setCurrScaleOptions] = useState(
    generateScaleOptions(currScaleType)
  );

  const handleInstrumentChange = (e: React.FormEvent<HTMLSelectElement>) =>
    setCurrInstrument(parseInt(e.currentTarget.value));

  const handleScaleTypeChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setCurrScaleType(parseInt(e.currentTarget.value));
    setCurrScale(scales[parseInt(e.currentTarget.value)][0]);
    setCurrScaleOptions(generateScaleOptions(parseInt(e.currentTarget.value)));
  };

  const handleScaleChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setCurrScale(scales[currScaleType][parseInt(e.currentTarget.value)]);
  };

  return (
    <div>
      <Head>
        <title>
          Scale Helper - Visualize musical scales on your instrument
        </title>
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
            key={`currentscale-select-${currScaleType}`}
            className="w-18"
            onChange={handleScaleChange}
            options={currScaleOptions}
          />
        </div>

        <div>
          {currScale.notes.map((note: number, k: number) => (
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
