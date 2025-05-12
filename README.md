# Spotify Top Artists and Tracks

A web application that displays a user's top artists and tracks from Spotify. Users can view their favorite music categorized by different time periods: last 4 weeks, last 6 months, and all time.

![Screenshot of application](/static/img/fav-music.png)

## Features

- Authenticate with Spotify account
- Display user profile information
- View top artists with profile images
- View top tracks with album artwork
- Filter by time period:
  - Last 4 weeks
  - Last 6 months
  - All time
- Toggle between artists and tracks views

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/FavMusic.git
   cd FavMusic
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```
   pip install flask requests python-dotenv
   ```

4. Create a `.env` file in the project root with your Spotify API credentials:
   ```
   CLIENT_ID=your_spotify_client_id
   CLIENT_SECRET=your_spotify_client_secret
   ```

## Configuration

1. Register your application at the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/)
2. Set your redirect URI in the Spotify Dashboard to match the one in the application 
3. For local development, you may want to change the REDIRECT_URI in app.py to:
   ```python
   REDIRECT_URI = 'http://127.0.0.1:5000/callback'
   ```

## Usage

1. Start the Flask server:
   ```
   python app.py
   ```

2. Open your browser and navigate to:
   ```
   http://127.0.0.1:5000
   ```

3. Click "Login with Spotify" to authenticate with your Spotify account
4. After authentication, your top artists will be displayed by default
5. Use the navigation buttons to switch between artists and tracks views
6. Use the dropdown menu to change the time period

## Project Structure

```
FavMusic/
├── app.py                 # Flask application and Spotify API integration
├── static/
│   ├── script.js          # Client-side JavaScript for UI interactions
│   └── style.css          # CSS styles for the application
├── templates/
│   └── index.html         # Main HTML template
└── .env                   # Environment variables (your own spotify client_id & client_secret)
```

## Technologies Used

- **Backend**: Flask (Python)
- **Frontend**: HTML, CSS, JavaScript
- **API**: Spotify Web API
- **Authentication**: OAuth 2.0
- **Deployment**: Vercel

## Author

Created by [Ron Vincent Cada](https://github.com/lucifron28)
