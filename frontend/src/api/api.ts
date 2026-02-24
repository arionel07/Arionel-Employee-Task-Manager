import { axiosConfig } from '@/config/api.config'
import axios from 'axios'

export const api = axios.create(axiosConfig)
