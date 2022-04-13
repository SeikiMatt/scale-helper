import Head from "next/head";
import Navbar from "components/Navbar";
import Footer from "components/Footer";

const NOTES_SHARPS = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];
const NOTES_FLATS = [
  "C",
  "Db",
  "D",
  "Eb",
  "E",
  "F",
  "Gb",
  "G",
  "Ab",
  "A",
  "Bb",
  "B",
];

const C_MAJOR = ["C", "D", "E", "F", "G", "A", "B"];
const C_MINOR = ["C", "D", "Eb", "F", "G", "Ab", "Bb"];

const GUITAR_FRETBOARD = [
  [4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3],
  [11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  [7, 8, 9, 10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4, 5, 6],
  [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1],
  [9, 10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8],
  [4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3],
];

export default function Home() {
  return (
    <div className={""}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>
        <h1 className={"text-5xl"}>Scale Helper</h1>
        <p>Visualize scales on your instrument.</p>

        <h2 className="text-3xl pt-4 pb-2">Eb Major / C Minor</h2>
        <div>
          {GUITAR_FRETBOARD.map((string, stringNumber) => {
            return (
              <div key={"string-" + stringNumber}>
                {string.map((fret, fretNumber) => (
                  <button
                    className={
                      "px-4 py-2" +
                      (C_MINOR.indexOf(NOTES_FLATS[fret]) > -1
                        ? " text-green-500"
                        : "")
                    }
                    key={"string-" + stringNumber + "-fret-" + fretNumber}
                  >
                    {NOTES_FLATS[fret]}
                  </button>
                ))}
              </div>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}
