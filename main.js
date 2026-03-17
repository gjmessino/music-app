//const CLIENT_ID = //
//const CLIENT_SECRET = //
const token = getToken();

async function getProfile(accessToken) {
  let accessToken = localStorage.getItem('access_token');
  const response = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: 'Bearer ' + accessToken
    }
  });
  const data = await response.json();
}

//async function getToken(){
//    let authString = btoa(CLIENT_ID + ":" + CLIENT_SECRET);
//    const result = await fetch("https://accounts.spotify.com/api/token", {
 //       method: "POST",
 //       headers: {
 //           "Content-Type": "application/x-www-form-urlencoded",
 //           "Authorization": "Basic " + authString
 //       },
 //       body: "grant_type=client_credentials"
 //   });
//    const data = await result.json();
//    return data.access_token;
//}
async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body:JSON.stringify(body)
  });
  return await res.json();
}

async function getMyArtists() {
    const data = await fetchWebApi(`v1/me/top/artists`, "GET");
    const title = String(data.data.artists.id)
    const title_element = document.getElementById("artist_name")
    title_element.innerHTML = title
}

async function getMyTracks() {
    const data = await fetchWebApi(`v1/me/top/tracks`, "GET");
    const title = String(data.data.tracks.id)
    const title_element = document.getElementById("track_name")
    title_element.innerHTML = title
}
async function searchArtists() {
    artist = document.getElementById("artist").value;
    const data = await fetchWebApi(`v1/search?q=${artist}&type=artist`, "GET");
    const name_element = document.getElementById("artist_name")
    name_element.innerHTML = data.artists.items[0].name;
    const album_element = document.getElementById("top_album")
    album_element.innerHTML = data.artists.items[0].genres[0];
    const track_element = document.getElementById("top_track")
    track_element.innerHTML = data.artists.items[0].popularity;
}
async function searchSpotify(query, accessToken) {
    const searchEndpoint = "https://api.spotify.com/v1/search";
    const params = new URLSearchParams({
        q: query,
        type: 'track,artist,album', // Comma-separated list of types to search
        limit: 10
    });

    const response = await fetch(`${searchEndpoint}?${params.toString()}`, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
}
