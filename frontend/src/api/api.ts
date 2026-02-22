import { axiosConfig } from '@/config/api.config'
import axios from 'axios'

const api = axios.create(axiosConfig)

export { api }
