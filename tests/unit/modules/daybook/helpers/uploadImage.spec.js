import cloudinary from 'cloudinary'
import uploadImage from '@/modules/daybook/helpers/uploadImage'
import axios from 'axios'

cloudinary.config({
  cloud_name: 'dpb6iy1ua',
  api_key: '926459376219233',
  api_secret: 'z1Whzur8JIrKBxThnIBGR63ties',
})

describe('pruebas en el uploadImage', () => {
  test('debe de cargar una imagen y retornar el url', async (done) => {
    //primer paso es decargar un recurso
    const { data } = await axios.get(
      'https://res.cloudinary.com/dpb6iy1ua/image/upload/v1633281013/dazeqbysb8kxexkumc6z.png',
      {
        responseType: 'arraybuffer',
      },
    )
    //descargado el recurso lo volmeos a recosntruir
    const file = new File([data], 'foto.png') //reconstruir con la misma extension que de descargo
    //subiendo el archivo a cloudinary
    const url = await uploadImage(file)

    const segments = url.split('/')
    const imageId = segments[segments.length - 1].replace('.png', '')
    cloudinary.v2.api.delete_resources(imageId, {}, () => {
      done()
    })

    expect(typeof url).toBe('string')
  })
})
