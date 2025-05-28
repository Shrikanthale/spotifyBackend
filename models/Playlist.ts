import mongoose from 'mongoose';

const playlistSchema = new mongoose.Schema({
  name: String,
  description: String,
  songs: Array,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.model('Playlist', playlistSchema);
