import { Request } from "express"

export interface Posts {
  [id: string]: {
    id: string
    title: string
  }
}

export interface PostPostsRequest {
  body: {
    title: string
  }
}