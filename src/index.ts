import express from 'express';

const app = express();
const API_KEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjQ1NGM3OWU3LWQzN2MtNGNmOS1hZmRkLTRjNDQwZGViOTMzZCIsImlhdCI6MTc3MzE2MDc4MSwic3ViIjoiZGV2ZWxvcGVyLzlhNzdkZDljLWZiYTgtZTY2Zi1mNjJmLWZhMjNjODc4ZmJmNCIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiNzQuMjIwLjQ4LjI0NiJdLCJ0eXBlIjoiY2xpZW50In1dfQ.Myp5BmP8GZ-g2KRsmwiPRyvyeA0uMnNbhGHVzXorA0jdS4GmJ7TAeNpBPdkyn2HPldUefsyK5mZlNMqoAGpl8A";

app.use((req: any, res: any, next: any) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.get("/ip", async (req: any, res: any) => {
  const r = await fetch("https://api.ipify.org?format=json");
  const data = await r.json();
  res.json(data);
});

app.get("/api", async (req: any, res: any) => {
  const target = req.query.url as string;
  if (!target) return res.status(400).json({ error: "Missing url" });
  try {
    const r = await fetch(target, {
      headers: { Authorization: `Bearer ${API_KEY}` }
    });
    const data = await r.json();
    res.json(data);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(process.env.PORT || 3000);
