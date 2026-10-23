import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import api from './routes.js';

const app = express();
app.set('trust proxy', 1);                                        // behind Render/Vercel proxies
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({ origin: (process.env.CORS_ORIGIN || 'http://localhost:5173').split(',') }));
app.use(express.json({ limit: '20kb' }));
app.use('/api', rateLimit({ windowMs: 60_000, limit: 120 }), api);
app.use((_q, s) => s.status(404).json({ error: 'Not found' }));
app.use((err, _q, s, _n) => {
  console.error(err);
  s.status(err.status || 500).json({ error: err.status ? err.message : 'Server error' });
});

const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
mongoose.connect(uri);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API ready on :${PORT}`));
