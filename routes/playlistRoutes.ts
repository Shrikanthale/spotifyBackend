import express from 'express';
import Playlist from '../models/Playlist';
import { auth } from '../middleware/auth';

const router = express.Router();

router.use(auth);

router.get('/', async (req, res) => {
  const playlists = await Playlist.find({ userId: (req as any).user.id });
  res.json(playlists);
});

router.post('/', async (req, res) => {
  const { name, description, songs } = req.body;
  const playlist = await Playlist.create({ name, description, songs, userId: (req as any).user.id });
  res.status(201).json(playlist);
});

router.put('/:id', async (req, res) => {
  const updated = await Playlist.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete('/:id', async (req, res) => {
  await Playlist.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

export default router;
