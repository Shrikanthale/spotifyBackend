import express, { Request, Response, Router, RequestHandler } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import Playlist from '../models/Playlist';
import { auth } from '../middleware/auth';

dotenv.config();
const router: Router = express.Router();

let tokenCache = { token: 'BQBsxIcQyNACsBN9890GdO5cVo60beKdy3hVJYvDPnfRGvieCXi_6HFZ0nFM2zGWWy', expires: 0 };

async function getSpotifyToken() {
  if (Date.now() < tokenCache.expires) return tokenCache.token;

  try {
    const res = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({ grant_type: 'client_credentials' }),
      {
        headers: {
          Authorization:
            'Basic ' +
            Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    tokenCache = {
      token: res.data.access_token,
      expires: Date.now() + res.data.expires_in * 1000,
    };

    return tokenCache.token;
  } catch (error) {
    console.error('Error getting Spotify token:', error);
    throw new Error('Failed to get Spotify token');
  }
}

const searchHandler: RequestHandler = async (req, res): Promise<void> => {
  try {
    const { q } = req.query;
    if (!q) {
      res.status(400).json({ error: 'Query parameter "q" is required' });
      return;
    }

    const token = await getSpotifyToken();
    const result = await axios.get(`https://api.spotify.com/v1/search`, {
      params: { q, type: 'track' },
      headers: { Authorization: `Bearer ${token}` },
    });

    res.json(result.data);
  } catch (error) {
    console.error('Spotify search error:', error);
    res.status(500).json({ error: 'Failed to search Spotify' });
  }
};

router.get('/search', searchHandler);

const addToPlaylistHandler: RequestHandler = async (req, res): Promise<void> => {
  try {
    const { playlistId } = req.params;
    const { trackId, name, artist, album } = req.body;

    if (!trackId || !name) {
      res.status(400).json({ error: 'Track ID and name are required' });
      return;
    }

    const playlist = await Playlist.findOne({ _id: playlistId, userId: (req as any).user.id });
    if (!playlist) {
      res.status(404).json({ error: 'Playlist not found' });
      return;
    }

    const song = {
      trackId,
      name,
      artist,
      album,
      addedAt: new Date()
    };

    playlist.songs.push(song);
    await playlist.save();

    res.json(playlist);
  } catch (error) {
    console.log('Error adding song to playlist:', error);
    res.status(500).json({ error: 'Failed to add song to playlist' });
  }
};

router.post('/playlists/:playlistId/songs', auth, addToPlaylistHandler);

export default router;
