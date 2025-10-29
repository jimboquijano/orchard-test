import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express()
const PORT = 3000

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use(cors())

// Serve static files from public
app.use(express.static(path.join(__dirname, 'public')))

// Serve JSON data
app.get('/api/cards', (req, res) => {
  res.sendFile(path.join(__dirname, '/mock/cards.json'))
})

app.get('/api/gallery', (req, res) => {
  res.sendFile(path.join(__dirname, '/mock/gallery.json'))
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
