import { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone';
import { searchTrack } from './deezer';
import { SONGS, shuffle } from './songs';

const GREEN = '#1DB954';
const PINK = '#ff6b9d';
const GOLD = '#ffd700';

function Card({ children }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)',
      borderRadius: 20, border: '1px solid rgba(255,255,255,0.1)',
      padding: 36, maxWidth: 560, width: '100%',
      boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
    }}>{children}</div>
  );
}

function Btn({ children, onClick, color, disabled, style }) {
  return (
    <button onClick={onClick} disabled={disabled}
      style={{
        background: color || GREEN, color: '#fff', border: 'none',
        borderRadius: 50, padding: '14px 32px', fontSize: 16, fontWeight: 700,
        cursor: disabled ? 'default' : 'pointer', opacity: disabled ? 0.4 : 1,
        transition: 'all 0.2s', ...style,
      }}>{children}</button>
  );
}

export default function App() {
  const [screen, setScreen] = useState('menu');
  const [gameSongs, setGameSongs] = useState([]);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);
  const [rounds, setRounds] = useState(10);
  const [options, setOptions] = useState([]);
  const [deezerTrack, setDeezerTrack] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lyricHint, setLyricHint] = useState(false);
  const [yearHint, setYearHint] = useState(false);
  const [lyricUsed, setLyricUsed] = useState(false);
  const [yearUsed, setYearUsed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [playCount, setPlayCount] = useState(0);
  const [result, setResult] = useState(null);
  const [hover, setHover] = useState(-1);
  const [audioMode, setAudioMode] = useState('synth');
  const [timeLeft, setTimeLeft] = useState(30);
  const synthRef = useRef(null);
  const audioRef = useRef(null);
  const timerRef = useRef(null);
  const song = gameSongs[idx];

  useEffect(() => () => {
    if (synthRef.current) try { synthRef.current.dispose(); } catch(e) {}
    if (audioRef.current) audioRef.current.pause();
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  const makeOptions = (correct) => {
    const wrong = shuffle(SONGS.filter(s => s.title !== correct.title)).slice(0, 3);
    return shuffle([
      { title: correct.title, artist: correct.artist, correct: true },
      ...wrong.map(s => ({ title: s.title, artist: s.artist, correct: false })),
    ]);
  };

  const loadRound = async (songs, i) => {
    setLoading(true); setResult(null);
    setLyricHint(false); setYearHint(false); setLyricUsed(false); setYearUsed(false);
    setPlayCount(0); setPlaying(false); setTimeLeft(30);
    setDeezerTrack(null); setAudioMode('synth');
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    if (synthRef.current) { try { synthRef.current.dispose(); } catch(e) {} synthRef.current = null; }
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    const s = songs[i];
    setOptions(makeOptions(s));
    try {
      const track = await searchTrack(s.query);
      if (track && track.previewUrl) { setDeezerTrack(track); setAudioMode('deezer'); }
    } catch(e) {}
    setLoading(false);
  };

  const startGame = async () => {
    const sel = shuffle(SONGS).slice(0, rounds);
    setGameSongs(sel); setIdx(0); setScore(0); setStreak(0); setBest(0);
    setScreen('play'); await loadRound(sel, 0);
  };

  const playSynth = () => {
    if (!song) return;
    Tone.start().then(() => {
      if (synthRef.current) try { synthRef.current.dispose(); } catch(e) {}
      const synth = new Tone.Synth({
        oscillator: { type: song.wave || 'square' },
        envelope: { attack: 0.02, decay: 0.3, sustain: 0.3, release: 0.5 }, volume: -8,
      }).toDestination();
      synthRef.current = synth;
      const now = Tone.now(); let maxT = 0;
      song.notes.forEach(note => {
        synth.triggerAttackRelease(note.n, note.d, now + note.t);
        if (note.t + 0.5 > maxT) maxT = note.t + 0.5;
      });
      setTimeout(() => setPlaying(false), (maxT + 0.5) * 1000);
    });
  };

  const playDeezer = () => {
    if (!deezerTrack?.previewUrl) return;
    if (!audioRef.current) audioRef.current = new Audio();
    audioRef.current.src = deezerTrack.previewUrl;
    audioRef.current.volume = 0.6;
    audioRef.current.play().catch(() => {});
    audioRef.current.onended = () => { setPlaying(false); if (timerRef.current) clearInterval(timerRef.current); };
    setTimeLeft(30);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          if (audioRef.current) audioRef.current.pause();
          setPlaying(false);
          setResult({ correct: false, timeout: true, points: 0 });
          setStreak(0); setScreen('result'); return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const playAudio = () => {
    if (playing) return;
    setPlaying(true); setPlayCount(c => c + 1);
    if (audioMode === 'deezer') playDeezer(); else playSynth();
  };

  const stopAudio = () => {
    if (audioRef.current) audioRef.current.pause();
    if (synthRef.current) try { synthRef.current.dispose(); } catch(e) {}
    if (timerRef.current) clearInterval(timerRef.current);
    setPlaying(false);
  };

  const handleGuess = (opt) => {
    stopAudio();
    const correct = opt.correct;
    const playBonus = audioMode === 'deezer' ? Math.floor(timeLeft * 10) : (playCount <= 1 ? 200 : playCount <= 2 ? 100 : 0);
    const penalty = (lyricUsed ? 100 : 0) + (yearUsed ? 50 : 0);
    const points = correct ? Math.max(50, 300 + playBonus - penalty) : 0;
    if (correct) {
      setScore(p => p + points);
      setStreak(p => { const n = p + 1; setBest(b => Math.max(b, n)); return n; });
    } else { setStreak(0); }
    setResult({ correct, points }); setScreen('result');
  };

  const nextRound = () => {
    const next = idx + 1;
    if (next >= gameSongs.length) { setScreen('over'); return; }
    setIdx(next); setScreen('play'); loadRound(gameSongs, next);
  };

  const wrap = { minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 20 };

  if (screen === 'menu') return (
    <div style={wrap}><Card>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 56 }}>🎸</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginTop: 8 }}>Rock & Rewind</h1>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, marginTop: 6 }}>Name That Tune — Classic Rock Edition</p>
      </div>
      <div style={{ margin: '28px 0', padding: 18, background: 'rgba(255,255,255,0.04)', borderRadius: 14, fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8 }}>
        <strong style={{ color: '#fff' }}>How to play:</strong><br/>
        Listen to a real 30-second song preview. Pick the correct song from 4 choices. Faster guesses = more points! Use hints if stuck (costs points).
      </div>
      <div style={{ textAlign: 'center', marginBottom: 22 }}>
        <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginRight: 10 }}>Rounds:</span>
        {[5, 10, 15, 20].map(n => (
          <button key={n} onClick={() => setRounds(n)} style={{
            background: rounds === n ? GREEN : 'rgba(255,255,255,0.08)',
            color: '#fff', border: 'none', borderRadius: 8, padding: '8px 18px', margin: '0 4px',
            cursor: 'pointer', fontWeight: rounds === n ? 700 : 400, fontSize: 14,
          }}>{n}</button>
        ))}
      </div>
      <Btn onClick={startGame} style={{ width: '100%', fontSize: 18, padding: 16 }}>🎶 Start Game</Btn>
    </Card></div>
  );

  if (screen === 'play') return (
    <div style={wrap}><Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>Round {idx+1}/{gameSongs.length}</span>
        <span style={{ fontSize: 15, fontWeight: 700, color: GOLD }}>Score: {score}</span>
        <span style={{ fontSize: 13, color: streak >= 3 ? PINK : 'rgba(255,255,255,0.4)' }}>{streak >= 3 ? '🔥 ' : ''}Streak: {streak}</span>
      </div>
      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px 0' }}>
          <div style={{ fontSize: 40, animation: 'spin 1s linear infinite' }}>🎵</div>
          <p style={{ color: 'rgba(255,255,255,0.45)', marginTop: 12 }}>Loading track...</p>
          <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
        </div>
      ) : (<>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          {audioMode === 'deezer' && deezerTrack?.albumArt ? (
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <img src={deezerTrack.albumArt} alt="" style={{ width: 150, height: 150, borderRadius: 16, objectFit: 'cover', filter: 'blur(20px) brightness(0.4)' }} />
              <button onClick={playing ? stopAudio : playAudio} style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
                background: playing ? 'rgba(29,185,84,0.3)' : GREEN,
                border: playing ? `3px solid ${GREEN}` : 'none',
                borderRadius: '50%', width: 64, height: 64, fontSize: 26, cursor: 'pointer', color: '#fff',
                boxShadow: '0 4px 20px rgba(29,185,84,0.4)',
              }}>{playing ? '⏸' : '▶'}</button>
            </div>
          ) : (
            <button onClick={playing ? stopAudio : playAudio} style={{
              width: 120, height: 120, borderRadius: '50%',
              background: playing ? 'rgba(29,185,84,0.3)' : GREEN,
              border: playing ? `3px solid ${GREEN}` : 'none',
              fontSize: 40, cursor: playing ? 'default' : 'pointer', color: '#fff',
              boxShadow: playing ? '0 0 30px rgba(29,185,84,0.4)' : '0 8px 30px rgba(29,185,84,0.3)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            }}>{playing ? '♫' : '▶'}</button>
          )}
          {playing && audioMode === 'deezer' && (
            <div style={{ marginTop: 14 }}>
              <div style={{ height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${(timeLeft/30)*100}%`, background: timeLeft > 10 ? GREEN : PINK, transition: 'width 1s linear' }} />
              </div>
              <p style={{ fontSize: 13, color: timeLeft > 10 ? 'rgba(255,255,255,0.4)' : PINK, marginTop: 4 }}>{timeLeft}s</p>
            </div>
          )}
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 10 }}>
            {audioMode === 'deezer' ? '🎧 Real Audio Preview' : '🎹 Synth Melody'}
            {audioMode === 'synth' && !playing && playCount > 0 && ` • Plays: ${playCount}`}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 16 }}>
          <Btn onClick={() => { setLyricHint(true); setLyricUsed(true); }} disabled={lyricHint} color="rgba(255,255,255,0.1)" style={{ padding: '8px 14px', fontSize: 13, borderRadius: 10 }}>
            💡 Lyric{!lyricHint ? ' (-100)' : ''}
          </Btn>
          <Btn onClick={() => { setYearHint(true); setYearUsed(true); }} disabled={yearHint} color="rgba(255,255,255,0.1)" style={{ padding: '8px 14px', fontSize: 13, borderRadius: 10 }}>
            📅 Year{!yearHint ? ' (-50)' : ''}
          </Btn>
        </div>
        {lyricHint && song && <div style={{ textAlign: 'center', padding: '10px 14px', background: 'rgba(255,215,0,0.08)', borderRadius: 10, marginBottom: 12, fontSize: 14, color: GOLD, fontStyle: 'italic' }}>{song.hint}</div>}
        {yearHint && song && <div style={{ textAlign: 'center', fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 12 }}>Released in <strong style={{ color: '#fff' }}>{song.year}</strong></div>}
        <div>
          {options.map((opt, i) => (
            <button key={i} onClick={() => handleGuess(opt)} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(-1)}
              style={{
                width: '100%', padding: '14px 18px', borderRadius: 14, display: 'block',
                border: hover === i ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(255,255,255,0.12)',
                background: hover === i ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.04)',
                color: '#fff', fontSize: 15, cursor: 'pointer', textAlign: 'left', marginBottom: 9,
              }}>
              <strong>{opt.title}</strong>
              <span style={{ color: 'rgba(255,255,255,0.4)', marginLeft: 8, fontSize: 13 }}>{opt.artist}</span>
            </button>
          ))}
        </div>
      </>)}
    </Card></div>
  );

  if (screen === 'result' && song) {
    const ok = result?.correct;
    return (
      <div style={wrap}><Card>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 60 }}>{ok ? '🎉' : result?.timeout ? '⏰' : '😅'}</div>
          <h2 style={{ marginTop: 8, fontSize: 22, color: ok ? GREEN : PINK, fontWeight: 800 }}>
            {ok ? 'Nailed it!' : result?.timeout ? "Time's up!" : 'Not quite!'}
          </h2>
          {ok && <p style={{ color: GOLD, fontSize: 20, fontWeight: 700, marginTop: 8 }}>+{result.points} pts</p>}
          <div style={{ marginTop: 20, padding: 18, background: 'rgba(255,255,255,0.04)', borderRadius: 14 }}>
            {deezerTrack?.albumArtSmall && <img src={deezerTrack.albumArtSmall} alt="" style={{ width: 100, height: 100, borderRadius: 12, marginBottom: 10 }} />}
            <p style={{ fontSize: 20, fontWeight: 700 }}>{song.title}</p>
            <p style={{ marginTop: 4, color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>{song.artist} • {song.year}</p>
          </div>
          {streak >= 3 && <p style={{ color: PINK, marginTop: 12, fontWeight: 700 }}>🔥 Streak: {streak}!</p>}
          <Btn onClick={nextRound} style={{ marginTop: 22, width: '100%' }}>
            {idx + 1 >= gameSongs.length ? '🏆 See Results' : 'Next Song →'}
          </Btn>
        </div>
      </Card></div>
    );
  }

  if (screen === 'over') {
    const max = gameSongs.length * 600;
    const pct = Math.round((score / max) * 100);
    let grade, emoji;
    if (pct >= 90) { grade = 'Rock Legend'; emoji = '🏆'; }
    else if (pct >= 70) { grade = 'Guitar Hero'; emoji = '🎸'; }
    else if (pct >= 50) { grade = 'Rising Star'; emoji = '🎵'; }
    else if (pct >= 30) { grade = 'Karaoke Kid'; emoji = '🎤'; }
    else { grade = 'Keep Listening!'; emoji = '📻'; }
    return (
      <div style={wrap}><Card>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 60 }}>{emoji}</div>
          <h1 style={{ marginTop: 8, fontSize: 26, fontWeight: 800 }}>Game Over!</h1>
          <div style={{ margin: '22px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ padding: 16, background: 'rgba(255,255,255,0.04)', borderRadius: 12, textAlign: 'center' }}>
              <div style={{ fontSize: 26, fontWeight: 800, color: GOLD }}>{score}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>Score</div>
            </div>
            <div style={{ padding: 16, background: 'rgba(255,255,255,0.04)', borderRadius: 12, textAlign: 'center' }}>
              <div style={{ fontSize: 26, fontWeight: 800, color: PINK }}>{best}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>Best Streak</div>
            </div>
          </div>
          <div style={{ padding: 18, background: 'rgba(255,255,255,0.04)', borderRadius: 14, marginBottom: 22 }}>
            <div style={{ fontSize: 18, fontWeight: 700 }}>{grade}</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>{pct}%</div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Btn onClick={startGame} style={{ flex: 1 }}>🎶 Play Again</Btn>
            <Btn onClick={() => setScreen('menu')} color="rgba(255,255,255,0.1)" style={{ flex: 1 }}>Menu</Btn>
          </div>
        </div>
      </Card></div>
    );
  }
  return null;
}
