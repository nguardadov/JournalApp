import axios from 'axios'

const authApi = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts',
  params: {
    key: 'AIzaSyC1sTv1MBqZ0Lepgnjt-7nW_mfqNVG3NFs',
  },
})

export default authApi
