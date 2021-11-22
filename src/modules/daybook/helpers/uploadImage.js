import axios from 'axios'

const uploadFile = async (file) => {
  if (!file) return
  try {
    const formData = new FormData()
    formData.append('upload_preset', 'curso-vue')
    formData.append('file', file)

    const url = 'https://api.cloudinary.com/v1_1/dpb6iy1ua/image/upload'
    const { data } = await axios.post(url, formData)
    //console.log(data)
    return data.secure_url
  } catch (error) {
    console.error('Error al cargar la imagen, revisar logs')
    console.log(error)
    return null
  }
}

export default uploadFile
