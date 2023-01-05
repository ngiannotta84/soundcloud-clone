/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import Playlist from "./Playlist";
import "../styles/musicplayer.css";
import {
  music,
  pause,
  play,
  skip,
  volumeLow,
  volumeMedium,
  volumeMute,
  menu,
} from "../media/icons";

const MusicPlayer = ({
  playlist,
  playlistIndex,
  setPlaylistIndex,
  removeFromPlaylist,
}) => {
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [showVolumeInput, setShowVolumeInput] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const audioRef = useRef(null);

  const song = playlist[playlistIndex] || {};

  const handlePlaying = (isPlaying) => {
    if (isPlaying === undefined) {
      setPlaying((prev) => !prev);
    } else {
      setPlaying(isPlaying);
    }
  };

  const skipSong = (forwards = true) => {
    if (forwards) {
      if (playlistIndex === playlist.length - 1) {
        setPlaylistIndex(0);
      } else {
        setPlaylistIndex((prev) => prev + 1);
      }
    } else if (playlistIndex > 0) {
      setPlaylistIndex((prev) => prev - 1);
    } else {
      setPlaylistIndex(playlist.length - 1);
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

  const volumeIcon = () => {
    if (volume === 0) return volumeMute;
    if (volume < 0.5) return volumeLow;
    return volumeMedium;
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
        onEnded={() => skipSong()}
        data-testid="audio"
      />
      <div className="music-player-space" />
      <div className="music-player">
        <div className="music-player__left">
          <img
            src={song.image || music}
            alt={`${song.albumName} cover art`}
            className="music-player__left__cover-art"
          />
        </div>
        <div className="music-player__center">
          <h2 className="music-player__song-info">
            {song.artistName && `${song.artistName} - ${song.songName}`}
          </h2>
          <input
            type="range"
            name="time"
            min={0}
            max={duration}
            value={time}
            onChange={handleProgressBarChange}
            className="music-player__progress-bar"
            data-testid="progressBar"
          />
          <div className="music-player__center__under">
            <p className="music-player__center__under__time">
              {calcTime(time)}
            </p>
            <div className="music-player__center__under__buttons">
              <button
                type="button"
                onClick={() => skipSong(false)}
                className="music-player__skip-backwards"
              >
                <img src={skip} alt="skip backwards" />
              </button>
              <button
                type="button"
                onClick={() => handlePlaying()}
                className="music-player__play-pause"
              >
                <img
                  src={playing ? pause : play}
                  alt={playing ? "play" : "pause"}
                />
              </button>
              <button
                type="button"
                onClick={() => skipSong()}
                className="music-player__skip-forwards"
              >
                <img src={skip} alt="skip forwards" />
              </button>
            </div>
            <p className="music-player__center__under__time">
              {calcTime(duration)}
            </p>
          </div>
        </div>
        <div className="music-player__right">
          <div className="music-player__volume">
            {showVolumeInput && (
              <input
                type="range"
                onChange={handleVolume}
                value={volume * 100}
                min={0}
                max={100}
                name="volume"
                data-testid="volume"
                className="music-player__volume__input"
              />
            )}
            <button
              type="button"
              onClick={() => setShowVolumeInput((prev) => !prev)}
            >
              <img src={volumeIcon()} alt="volume" />
            </button>
          </div>
          <div className="music-player__playlist">
            {showPlaylist && (
              <Playlist
                playlist={playlist}
                playlistIndex={playlistIndex}
                setPlaylistIndex={setPlaylistIndex}
                removeFromPlaylist={removeFromPlaylist}
              />
            )}
            <button
              type="button"
              onClick={() => setShowPlaylist((prev) => !prev)}
            >
              <img src={menu} alt="playlist" />
            </button>
          </div>
        </div>
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
  removeFromPlaylist: PropTypes.func.isRequired,
};

export default MusicPlayer;
