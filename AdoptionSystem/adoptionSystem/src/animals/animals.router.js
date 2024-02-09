import express from 'express'
import { test, regist } from './animals.controller.js'

const api = express.Router();

api.get('/test', test)
api.post('/regist', regist)

export default api