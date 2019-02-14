import axios from 'axios'

export const http = axios.create({
  baseURL: 'http://server.mozotools.com/api', // production base URL
  // baseURL: 'http://localhost:3000/api', // local dev base URL
})
