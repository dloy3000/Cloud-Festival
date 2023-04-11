import spotipy as sp
from spotipy import util
from spotipy.oauth2 import SpotifyOAuth

# retrieves creds from auth file.


def getCreds(fileName):
    auth = open(fileName, "r").readlines()

    clientID = auth[1].split(" ")[1].replace('"', "")

    clientSecret = auth[2].split(" ")[1].replace('"', "")

    redirectURI = auth[3].split(" ")[1].replace('"', "")

    username = auth[4].split(" ")[1].replace('"', "").replace("\n", "")

    return clientID, clientSecret, redirectURI, username

# Returns a Spotify client with the given scopes.


def getClient(scopes, clientID, clientSecret, redirectURI):
    authorizer = SpotifyOAuth(
        client_id=clientID, client_secret=clientSecret, redirect_uri=redirectURI, scope=scopes)

    return sp.Spotify(oauth_manager=authorizer)

# Returns the URIs of targeted playlists using a filter.


def getPlaylistData(client, filter, tag):
    playlists = client.current_user_playlists()["items"]
    URIs = []
    descriptions = []
    images = []

    for playlist in playlists:
        if(filter in playlist[tag].lower() and "None" not in playlist[tag]):
            URIs.append(playlist["id"])
            descriptions.append(playlist["description"].replace("&#x27;", ""))
            images.append(playlist["images"][0]["url"])

    return URIs, descriptions, images

# Returns the embeds of the given playlists.


def getEmbeds(URIs):
    embeds = []

    for uri in URIs:
        embed = "https://open.spotify.com/embed/playlist/{0}?utm_source=generator".format(
            uri)
        embeds.append(embed)

    return embeds

# Loads the embeds into a JSON.


def loadJSON(object, data, name):
    file = open("{0}.json".format(name), "w")
    file.write('{"' + object + '":[')

    for embed in data:
        # Remove final comma for terminating value.
        if(embed in data[len(data)-1]):
            file.write('"{0}"'.format(embed))

        # Add comma for nonterminating value.
        else:
            file.write('"{0}",'.format(embed))

    file.write(']}')
    file.close()


clientID, clientSecret, redirectURI, username = getCreds("creds.json")
scopes = "playlist-read-private, user-top-read, user-read-recently-played, user-read-private"
client = getClient(scopes, clientID, clientSecret, redirectURI)

# cloudFestivalID = "5dc0bed831991c9c" --Use if Spotify ever adds folder endpoints.
curatedURIs, curatedFlavor, curatedIMGs = getPlaylistData(
    client, "curated", "description")
ambienceURIs, ambienceFlavor, ambienceIMGs = getPlaylistData(
    client, "dnd", "name")

curatedEmbeds = getEmbeds(curatedURIs)
ambienceEmbeds = getEmbeds(ambienceURIs)

loadJSON("embeds", curatedEmbeds, "embedsCurated")
loadJSON("embeds", ambienceEmbeds, "embedsAmbient")
loadJSON("flavorDesc", curatedFlavor, "flavorDescCurated")
loadJSON("flavorDesc", ambienceFlavor, "flavorDescAmbience")
loadJSON("images", curatedIMGs, "imagesCurated")
loadJSON("images", ambienceIMGs, "imagesAmbience")
