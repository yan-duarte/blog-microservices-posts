import { Request } from "express"

export interface Posts {
  [id: string]: {
    id: string
    title: string
  }
}

export interface CustomRequest<B> extends Request {
  body: B
}

export interface PostRequestBody {
  title: string
}