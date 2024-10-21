from flask import Flask, render_template, redirect, request, session, url_for
import os
import requests

app = Flask(__name__)
app.secret_key = os.urandom(24)

CLIENT_ID = '040864a3c4934163afffb8453329de95'  # Replace with your client ID
CLIENT_SECRET = 'd273451a21784de5a03512c9f75938be'  # Replace with your client secret
REDIRECT_URI = 'https://np-music.vercel.app/callback'
SCOPE = 'user-top-read user-read-private'

@app.route('/')
def home():
    access_token = session.get('access_token')
    if access_token:
        headers = {
            'Authorization': f'Bearer {access_token}'
        }
        user_profile_response = requests.get('https://api.spotify.com/v1/me', headers=headers)
        top_artists_response = requests.get('https://api.spotify.com/v1/me/top/artists?time_range=long_term', headers=headers)
        top_tracks_response = requests.get('https://api.spotify.com/v1/me/top/tracks?time_range=long_term', headers=headers)

        user_profile = user_profile_response.json()
        top_artists = top_artists_response.json().get('items', [])
        top_tracks = top_tracks_response.json().get('items', [])

        return render_template('index.html', user_profile=user_profile, top_artists=top_artists, top_tracks=top_tracks)
    else:
        return render_template('index.html', user_profile=None, top_artists=[], top_tracks=[])

@app.route('/login')
def login():
    auth_url = (
        'https://accounts.spotify.com/authorize'
        '?response_type=code'
        f'&client_id={CLIENT_ID}'
        f'&scope={SCOPE}'
        f'&redirect_uri={REDIRECT_URI}'
    )
    return redirect(auth_url)

@app.route('/callback')
def callback():
    code = request.args.get('code')

    token_url = 'https://accounts.spotify.com/api/token'
    payload = {
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET,
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': REDIRECT_URI
    }
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }

    response = requests.post(token_url, data=payload, headers=headers)
    response_data = response.json()

    access_token = response_data.get('access_token')
    session['access_token'] = access_token

    return redirect(url_for('home'))

if __name__ == '__main__':
    app.run(debug=True)