curl http://localhost:11434/api/generate -d '{
  "model": "codegemma",
  "prompt":"Why is the sky blue?",
  "stream": false,
  "raw": true
}' >> out.txt
