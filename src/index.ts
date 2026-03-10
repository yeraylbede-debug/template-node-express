import express from 'express';

const app = express();
const API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjA3ZmQ2NDhkLTcwNmQtNGJkMS1iMTZkLTc5Zjk0ODA0ZGU3NyIsImlhdCI6MTc3MzE1OTA1MCwic3ViIjoiZGV2ZWxvcGVyLzlhNzdkZDljLWZiYTgtZTY2Zi1mNjJmLWZhMjNjODc4ZmJmNCIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiMzQuMTQyLjE0OC4xNCJdLCJ0eXBlIjoiY2xpZW50In1dfQ.6DbwfS3nRR1vZnyNo2DpkEASh1fKw6a6AES2n3l10YCm3A1PROFWcxh6itVL0kv-7doZGkPz5E7Z7auuAuE0yw';

app.use((req: any, res: any, next: any) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

app.get('/ip', async (req: any, res: any) => {
  const r = await fetch('https://api.ipify.org?format=json');
  const data = await r.json();
  res.json(data);
});

app.get('/api', async (req: any, res: any) => {
  const target = req.query.url as string;
  if (!target) return res.status(400).json({ error: 'Missing url' });
  try {
    const r = await fetch(target, {
      headers: { 'Authorization': `Bearer ${API_KEY}` }
    });
    const data = await r.json();
    res.json(data);
  } catch(e: any) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(process.env.PORT || 3000);
