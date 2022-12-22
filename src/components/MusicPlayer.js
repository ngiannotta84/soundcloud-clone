/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "../styles/musicplayer.css";

const MusicPlayer = ({ playlist, playlistIndex, setPlaylistIndex }) => {
  if (!playlist || playlist.length === 0) return null;
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(null);

  const song = playlist[playlistIndex];

  const handlePlaying = (isPlaying) => {
    if (isPlaying === undefined) {
      setPlaying((prev) => !prev);
    } else {
      setPlaying(isPlaying);
    }
  };

  const skipSong = (forwards = true) => {
    if (forwards) {
      if (playlistIndex === playlist.length) {
        setPlaylistIndex(0);
      } else {
        setPlaylistIndex((prev) => prev + 1);
      }
    } else if (playlistIndex === 0) {
      setPlaylistIndex(playlist.length);
    } else {
      setPlaylistIndex((prev) => prev - 1);
    }
  };

  const calcTime = (seconds) => {
    let sec = seconds;
    let min = 0;
    while (sec >= 60) {
      min += 1;
      sec -= 60;
    }
    if (sec < 10) {
      sec = `0${sec}`;
    }
    return `${min}:${sec}`;
  };

  const handleLoadedMetaData = () => {
    if (audioRef.current) {
      const seconds = Math.round(audioRef.current.duration);
      setDuration(seconds);
      if (playing) {
        audioRef.current.play();
      }
    }
  };

  const handleProgressBarChange = (e) => {
    const newTime = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
    setTime(newTime);
  };

  const handleVolume = (e) => {
    const value = Number(e.target.value / 100);
    if (value > 1) {
      setVolume(1);
    } else if (value < 0) {
      setVolume(0);
    } else {
      setVolume(value);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [playing, audioRef, playlistIndex]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume, audioRef]);

  useEffect(() => {
    const updateTimer = setInterval(() => {
      if (audioRef.current) {
        const seconds = Math.round(audioRef.current.currentTime);
        setTime(seconds);
      }
    }, 500);
    return () => clearInterval(updateTimer);
  }, [time]);

  return (
    <>
      <audio
        src={song.audio}
        ref={audioRef}
        onLoadedMetadata={handleLoadedMetaData}
      />
      <div className="music-player">
        <div className="music-player__left">
          <img
            src={song.image}
            alt={`${song.albumName} cover art`}
            className="music-player__cover-art"
          />
          <div className="music-player__info">
            <h2>{song.artistName}</h2>
            <h3>{song.songName}</h3>
          </div>
        </div>
        <div className="music-player__center">
          <input
            type="range"
            name="time"
            min={0}
            max={duration}
            value={time}
            onChange={handleProgressBarChange}
            className="music-player__progress-bar"
          />
          <div className="music-player__center__under">
            <p>{calcTime(time)}</p>
            <div>
              <button type="button" onClick={() => skipSong(false)}>
                Back
              </button>
              <button type="button" onClick={() => handlePlaying()}>
                Play/Pause
              </button>
              <button type="button" onClick={() => skipSong()}>
                Forwards
              </button>
            </div>
            <p>{calcTime(duration)}</p>
          </div>
        </div>
        <input
          type="range"
          onChange={handleVolume}
          value={volume * 100}
          min={0}
          max={100}
          name="volume"
        />
      </div>
    </>
  );
};

MusicPlayer.defaultProps = {
  playlist: null,
};

MusicPlayer.propTypes = {
  playlist: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      artistName: PropTypes.string,
      albumName: PropTypes.string,
      audio: PropTypes.string,
      songName: PropTypes.string,
    })
  ),
  playlistIndex: PropTypes.number.isRequired,
  setPlaylistIndex: PropTypes.func.isRequired,
};

export default MusicPlayer;
