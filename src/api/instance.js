import axios from 'axios'

const axiosConfig = axios.create({
   baseURL: 'https://api.mapster.bpinside.site',
   headers: {
      // guide
      // Authorization: 'a8965581d61fb9ac38603ddcbcf9e2261e3d5b49d9f9f440bb90cd71b0582998',

      // admin
      // Authorization: 'c78080ca-c1ca-4c69-963d-415b7c0a05eb',

      // owner 1 client
      // Authorization: '12092f61b3e8405eba8379413fe68db1',

      // owner 3
      // Authorization: 'c46c18f6fd4943448d1a1cf45dd1d3f6',

      // owner 7 guide im
      // Authorization: 'e62cbad3-c525-4073-8156-7ab779428b45',

      // local
      // Authorization: localStorage.getItem('user'),



      "Content-Type": "application/json",

   }
});


export default axiosConfig