import React, { useRef, useState } from "react";

const stations = [
  { name: "181.fm - Classic Rock", url: "https://strm112.181.fm/stream" },
  { name: "181.fm - Metal", url: "https://strm12.181.fm/stream" },
  { name: "Listen.FM - Chill", url: "https://listen.radioking.com/radio/16253/stream/54425" },
  { name: "Radio Paradise", url: "https://stream.radioparadise.com/aac-320" }
];

export default function RadioPlayer() {
  const audioRef = useRef(null);
  const [stationIndex, setStationIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) { audio.pause(); setPlaying(false); }
    else { audio.play().catch(()=>{}); setPlaying(true); }
  }

  function changeStation(i) {
    setStationIndex(i);
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.src = stations[i].url;
      audio.load();
      audio.play().catch(()=>{});
      setPlaying(true);
    }
  }

  return (
    <div className="radio-player">
      <button onClick={togglePlay}>{playing ? "Pause" : "Play"}</button>
      <select value={stationIndex} onChange={(e) => changeStation(Number(e.target.value))}>
        {stations.map((s, i) => (
          <option key={i} value={i}>{s.name}</option>
        ))}
      </select>
      <audio ref={audioRef} src={stations[stationIndex].url} preload="none" controls style={{display:"none"}} />
    </div>
  );
}