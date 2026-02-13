export function shuffle(arr) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
  }
  return a;
}

export var SONGS = [
  {t:"Smoke on the Water",a:"Deep Purple",y:1972,q:"Smoke on the Water Deep Purple",h:"The most famous guitar riff ever written",w:"sawtooth",
   n:[{n:"G3",d:"8n",t:0},{n:"Bb3",d:"8n",t:.3},{n:"C4",d:"4n",t:.6},{n:"G3",d:"8n",t:1.2},{n:"Bb3",d:"8n",t:1.5},{n:"Db4",d:"8n",t:1.8},{n:"C4",d:"4n",t:2.1},{n:"G3",d:"8n",t:2.8},{n:"Bb3",d:"8n",t:3.1},{n:"C4",d:"4n",t:3.4},{n:"Bb3",d:"8n",t:3.9},{n:"G3",d:"2n",t:4.2}]},
  {t:"Sweet Child O' Mine",a:"Guns N' Roses",y:1987,q:"Sweet Child O Mine Guns N Roses",h:"Slash's iconic guitar intro",w:"square",
   n:[{n:"D4",d:"16n",t:0},{n:"D5",d:"16n",t:.15},{n:"A4",d:"16n",t:.3},{n:"G4",d:"16n",t:.45},{n:"G5",d:"16n",t:.6},{n:"A4",d:"16n",t:.75},{n:"F#5",d:"16n",t:.9},{n:"A4",d:"16n",t:1.05},{n:"D4",d:"16n",t:1.2},{n:"D5",d:"16n",t:1.35},{n:"A4",d:"16n",t:1.5},{n:"G4",d:"16n",t:1.65},{n:"G5",d:"16n",t:1.8},{n:"A4",d:"16n",t:1.95},{n:"F#5",d:"16n",t:2.1},{n:"A4",d:"16n",t:2.25}]},
  {t:"Back in Black",a:"AC/DC",y:1980,q:"Back In Black ACDC",h:"One of the best-selling albums ever",w:"sawtooth",
   n:[{n:"E4",d:"8n",t:0},{n:"D4",d:"8n",t:.25},{n:"A3",d:"4n",t:.6},{n:"E4",d:"8n",t:1.3},{n:"D4",d:"8n",t:1.55},{n:"B3",d:"8n",t:1.8},{n:"A3",d:"4n",t:2.1},{n:"E4",d:"8n",t:2.9},{n:"D4",d:"8n",t:3.15},{n:"A3",d:"4n",t:3.5}]},
  {t:"Enter Sandman",a:"Metallica",y:1991,q:"Enter Sandman Metallica",h:"Exit light, enter night",w:"sawtooth",
   n:[{n:"E3",d:"8n",t:0},{n:"E3",d:"16n",t:.4},{n:"G3",d:"8n",t:.6},{n:"E3",d:"16n",t:.9},{n:"Bb3",d:"8n",t:1.1},{n:"A3",d:"8n",t:1.4},{n:"E3",d:"8n",t:1.7},{n:"E3",d:"16n",t:2.1},{n:"G3",d:"8n",t:2.3},{n:"E3",d:"16n",t:2.6},{n:"Bb3",d:"8n",t:2.8},{n:"A3",d:"4n",t:3.1}]},
  {t:"Billie Jean",a:"Michael Jackson",y:1982,q:"Billie Jean Michael Jackson",h:"The kid is not my son",w:"triangle",
   n:[{n:"F#3",d:"8n",t:0},{n:"F#3",d:"8n",t:.25},{n:"F#3",d:"8n",t:.5},{n:"F#3",d:"16n",t:.75},{n:"A3",d:"8n",t:.9},{n:"F#3",d:"8n",t:1.15},{n:"E3",d:"8n",t:1.4},{n:"F#3",d:"4n",t:1.65}]},
  {t:"Crazy Train",a:"Ozzy Osbourne",y:1980,q:"Crazy Train Ozzy Osbourne",h:"All aboard!",w:"square",
   n:[{n:"F#4",d:"16n",t:0},{n:"F#5",d:"16n",t:.12},{n:"F#4",d:"16n",t:.24},{n:"F#5",d:"16n",t:.36},{n:"F#4",d:"16n",t:.48},{n:"F#5",d:"16n",t:.6},{n:"E4",d:"16n",t:.72},{n:"E5",d:"16n",t:.84},{n:"D4",d:"16n",t:.96},{n:"D5",d:"16n",t:1.08},{n:"C#4",d:"16n",t:1.2},{n:"D4",d:"16n",t:1.32},{n:"C#4",d:"16n",t:1.44},{n:"B3",d:"16n",t:1.56},{n:"A3",d:"4n",t:1.68}]},
  {t:"Another One Bites the Dust",a:"Queen",y:1980,q:"Another One Bites The Dust Queen",h:"That iconic bass line",w:"sawtooth",
   n:[{n:"E2",d:"8n",t:0},{n:"E2",d:"8n",t:.2},{n:"E2",d:"8n",t:.4},{n:"G2",d:"8n",t:.7},{n:"A2",d:"16n",t:1},{n:"A2",d:"8n",t:1.2},{n:"B2",d:"4n",t:1.5}]},
  {t:"Seven Nation Army",a:"The White Stripes",y:2003,q:"Seven Nation Army White Stripes",h:"The stadium chant riff",w:"sawtooth",
   n:[{n:"E3",d:"4n",t:0},{n:"E3",d:"8n",t:.5},{n:"G3",d:"4n",t:.8},{n:"E3",d:"8n",t:1.3},{n:"D3",d:"4n",t:1.6},{n:"C3",d:"2n",t:2.1},{n:"B2",d:"2n",t:3}]},
  {t:"Iron Man",a:"Black Sabbath",y:1970,q:"Iron Man Black Sabbath",h:"Has he lost his mind? Can he see or is he blind?",w:"sawtooth",
   n:[{n:"B3",d:"4n",t:0},{n:"D4",d:"4n",t:.5},{n:"D4",d:"8n",t:1},{n:"E4",d:"4n",t:1.3},{n:"E4",d:"8n",t:1.8},{n:"G4",d:"8n",t:2.1},{n:"F#4",d:"8n",t:2.4},{n:"G4",d:"8n",t:2.7},{n:"F#4",d:"8n",t:3},{n:"E4",d:"8n",t:3.3},{n:"D4",d:"4n",t:3.6}]},
  {t:"Eye of the Tiger",a:"Survivor",y:1982,q:"Eye Of The Tiger Survivor",h:"Rocky III's anthem",w:"square",
   n:[{n:"C4",d:"16n",t:0},{n:"C4",d:"16n",t:.15},{n:"C4",d:"16n",t:.3},{n:"C4",d:"8n",t:.55},{n:"Bb3",d:"16n",t:.85},{n:"C4",d:"4n",t:1.05},{n:"C4",d:"16n",t:1.7},{n:"C4",d:"16n",t:1.85},{n:"C4",d:"16n",t:2},{n:"C4",d:"8n",t:2.25},{n:"Bb3",d:"16n",t:2.55},{n:"Ab3",d:"4n",t:2.75}]},
  {t:"Take on Me",a:"a-ha",y:1985,q:"Take On Me a-ha",h:"That synth riff and the pencil sketch music video",w:"square",
   n:[{n:"F#4",d:"16n",t:0},{n:"F#4",d:"16n",t:.13},{n:"D4",d:"16n",t:.26},{n:"B3",d:"16n",t:.39},{n:"B3",d:"16n",t:.65},{n:"E4",d:"16n",t:.78},{n:"E4",d:"16n",t:1.04},{n:"E4",d:"16n",t:1.17},{n:"G#4",d:"16n",t:1.3},{n:"G#4",d:"16n",t:1.43},{n:"A4",d:"16n",t:1.56},{n:"B4",d:"16n",t:1.69},{n:"A4",d:"16n",t:1.82},{n:"A4",d:"16n",t:1.95},{n:"A4",d:"16n",t:2.08},{n:"E4",d:"16n",t:2.21},{n:"D4",d:"16n",t:2.34},{n:"F#4",d:"4n",t:2.47}]},
  {t:"Don't Stop Believin'",a:"Journey",y:1981,q:"Don't Stop Believin Journey",h:"Just a small town girl...",w:"triangle",
   n:[{n:"E4",d:"8n",t:0},{n:"B4",d:"8n",t:.25},{n:"C#5",d:"8n",t:.5},{n:"E5",d:"8n",t:.75},{n:"C#5",d:"8n",t:1},{n:"B4",d:"8n",t:1.25},{n:"A4",d:"8n",t:1.5},{n:"B4",d:"8n",t:1.75}]},
  {t:"Bohemian Rhapsody",a:"Queen",y:1975,q:"Bohemian Rhapsody Queen",h:"Is this the real life? Is this just fantasy?",w:"triangle",
   n:[{n:"Bb4",d:"4n",t:0},{n:"A4",d:"8n",t:.4},{n:"Bb4",d:"4n",t:.7},{n:"G4",d:"8n",t:1.1},{n:"Eb4",d:"4n",t:1.5},{n:"Bb4",d:"8n",t:2},{n:"A4",d:"8n",t:2.3},{n:"Bb4",d:"4n",t:2.6},{n:"G4",d:"8n",t:3},{n:"Eb4",d:"2n",t:3.3}]},
  {t:"Thunderstruck",a:"AC/DC",y:1990,q:"Thunderstruck ACDC",h:"You've been...",w:"square",
   n:[{n:"B4",d:"16n",t:0},{n:"E4",d:"16n",t:.1},{n:"B4",d:"16n",t:.2},{n:"A4",d:"16n",t:.3},{n:"B4",d:"16n",t:.4},{n:"G4",d:"16n",t:.5},{n:"B4",d:"16n",t:.6},{n:"A4",d:"16n",t:.7},{n:"B4",d:"16n",t:.8},{n:"E4",d:"16n",t:.9},{n:"B4",d:"16n",t:1},{n:"A4",d:"16n",t:1.1},{n:"B4",d:"16n",t:1.2},{n:"G4",d:"16n",t:1.3},{n:"B4",d:"16n",t:1.4},{n:"A4",d:"16n",t:1.5}]},
  {t:"Stairway to Heaven",a:"Led Zeppelin",y:1971,q:"Stairway To Heaven Led Zeppelin",h:"There's a lady who's sure all that glitters is gold",w:"triangle",
   n:[{n:"A3",d:"8n",t:0},{n:"C4",d:"8n",t:.3},{n:"E4",d:"8n",t:.6},{n:"A4",d:"8n",t:.9},{n:"B4",d:"8n",t:1.2},{n:"E4",d:"8n",t:1.5},{n:"C4",d:"8n",t:1.8},{n:"G#3",d:"8n",t:2.1},{n:"C4",d:"8n",t:2.4},{n:"E4",d:"8n",t:2.7},{n:"G#4",d:"8n",t:3},{n:"B4",d:"4n",t:3.3}]},
  {t:"Hotel California",a:"Eagles",y:1977,q:"Hotel California Eagles",h:"You can check out any time you like...",w:"triangle",
   n:[{n:"B3",d:"8n",t:0},{n:"D4",d:"8n",t:.3},{n:"F#4",d:"8n",t:.6},{n:"B4",d:"8n",t:.9},{n:"F#4",d:"8n",t:1.2},{n:"A4",d:"8n",t:1.5},{n:"E4",d:"8n",t:1.8},{n:"G4",d:"8n",t:2.1},{n:"D4",d:"8n",t:2.4},{n:"F#4",d:"8n",t:2.7}]},
  {t:"Paranoid",a:"Black Sabbath",y:1970,q:"Paranoid Black Sabbath",h:"Can't help thinking about things...",w:"sawtooth",
   n:[{n:"E4",d:"8n",t:0},{n:"E4",d:"8n",t:.15},{n:"D4",d:"8n",t:.3},{n:"D4",d:"8n",t:.45},{n:"E4",d:"8n",t:.6},{n:"G4",d:"4n",t:.85},{n:"E4",d:"8n",t:1.3},{n:"E4",d:"8n",t:1.45},{n:"D4",d:"8n",t:1.6},{n:"D4",d:"8n",t:1.75},{n:"E4",d:"8n",t:1.9},{n:"G4",d:"4n",t:2.15}]},
  {t:"Livin' on a Prayer",a:"Bon Jovi",y:1986,q:"Livin On A Prayer Bon Jovi",h:"Tommy and Gina hold on",w:"square",
   n:[{n:"E4",d:"8n",t:0},{n:"E4",d:"8n",t:.25},{n:"F#4",d:"8n",t:.5},{n:"G4",d:"8n",t:.75},{n:"G4",d:"8n",t:1},{n:"A4",d:"8n",t:1.25},{n:"G4",d:"4n",t:1.5},{n:"F#4",d:"8n",t:2},{n:"E4",d:"4n",t:2.25}]},
  {t:"Purple Rain",a:"Prince",y:1984,q:"Purple Rain Prince",h:"I only wanted to see you laughing in the...",w:"triangle",
   n:[{n:"Bb4",d:"4n",t:0},{n:"Ab4",d:"8n",t:.5},{n:"F4",d:"4n",t:.8},{n:"Eb4",d:"8n",t:1.4},{n:"F4",d:"4n",t:1.7},{n:"Ab4",d:"8n",t:2.3},{n:"Bb4",d:"2n",t:2.6}]},
  {t:"Sunshine of Your Love",a:"Cream",y:1967,q:"Sunshine Of Your Love Cream",h:"Eric Clapton's blues-rock masterpiece riff",w:"sawtooth",
   n:[{n:"D3",d:"8n",t:0},{n:"D3",d:"16n",t:.3},{n:"F3",d:"8n",t:.5},{n:"G3",d:"16n",t:.8},{n:"Ab3",d:"8n",t:1},{n:"G3",d:"8n",t:1.3},{n:"F3",d:"8n",t:1.6},{n:"D3",d:"8n",t:1.9},{n:"F3",d:"8n",t:2.2},{n:"D3",d:"4n",t:2.5}]},
];

// Normalize song format
SONGS = SONGS.map(function(s) {
  return { title: s.t, artist: s.a, year: s.y, query: s.q, hint: s.h, wave: s.w, notes: s.n };
});
