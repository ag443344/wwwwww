export async function searchTrack(query) {
  try {
    var res = await fetch('/api/deezer?q=' + encodeURIComponent(query));
    var data = await res.json();
    if (data.data && data.data.length > 0) {
      var t = data.data[0];
      return {
        title: t.title,
        artist: t.artist ? t.artist.name : '',
        album: t.album ? t.album.title : '',
        albumArt: t.album ? (t.album.cover_big || t.album.cover_medium) : null,
        albumArtSmall: t.album ? (t.album.cover_medium || t.album.cover_small) : null,
        previewUrl: t.preview,
      };
    }
    return null;
  } catch (e) {
    console.warn('Deezer search failed:', e);
    return null;
  }
}
