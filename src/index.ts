import express, {Response} from 'express'
import { json } from 'body-parser'
import { randomBytes } from 'crypto'
import { PostPostsRequest, Posts } from './types'
import cors from 'cors'

const app = express()
app.use(json())
app.use(cors())

const posts: Posts = {}

app.get('/posts', (_req, res: Response<Posts>) => {
  res.send(posts)
});

app.post('/posts', (req: PostPostsRequest, res: Response<Posts[0]>) => {
  const id = randomBytes(4).toString('hex')
  const { title } = req.body

  posts[id] = {
    id, title
  }

  res.status(201).send(posts[id])
});

app.listen(4000, () => {
  console.log('Listening on 4000')
})