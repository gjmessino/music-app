const CLIENT_ID = //
const CLIENT_SECRET = //

async function getToken(){
    let authString = btoa(CLIENT_ID + ":" + CLIENT_SECRET);
    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Basic " + authString
        },
        body: "grant_type=client_credentials"
    });
    const data = await result.json();
    return data.access_token;
}
