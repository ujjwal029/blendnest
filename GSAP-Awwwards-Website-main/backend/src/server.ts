import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { db } from './index';
import { usersTable } from './db/schema';

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

app.use(cors());
app.use(express.json());

// Middleware to verify JWT
const authenticateToken = (req: any, res: express.Response, next: express.NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  if (!token) return res.status(401).json({ error: 'Access token required' });

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

app.post('/api/signup', async (req, res) => {
  const { name, age, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.insert(usersTable).values({ name, age, email, password: hashedPassword });
    res.status(201).json({ message: 'User created' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const users = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1);
    if (users.length > 0 && await bcrypt.compare(password, users[0].password)) {
      const token = jwt.sign({ id: users[0].id }, JWT_SECRET);
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Protected route example
app.get('/api/profile', authenticateToken, async (req: any, res) => {
  try {
    const users = await db.select().from(usersTable).where(eq(usersTable.id, req.user.id)).limit(1);
    if (users.length > 0) {
      res.json({ user: users[0] });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});