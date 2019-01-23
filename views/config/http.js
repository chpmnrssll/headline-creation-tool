import axios from 'axios'

export const http = axios.create({
  baseURL: 'http://pod.buyboxguardian.com:30000/api', //base URL goes here
})
