import axios from 'axios'

const axiosConfig = axios.create({
   baseURL: 'https://api.mapster.bpinside.site',
   headers: {
      // guide
      // Authorization: 'a8965581d61fb9ac38603ddcbcf9e2261e3d5b49d9f9f440bb90cd71b0582998',

      // admin
      Authorization: 'c78080ca-c1ca-4c69-963d-415b7c0a05eb',
   }
});
export default axiosConfig