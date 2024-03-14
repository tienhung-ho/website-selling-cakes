import axios from "axios";
import staffsServices from "./admin/staffs.services";
import { useAccountOfStaff } from '@/store/pinia.store'
import StaffServices from '@/services/admin/staffs.services'

const commonConfig = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};


const createApiAdmin = (baseURL) => {
  const instance = axios.create({
    baseURL,
    ...commonConfig
  });

  instance.interceptors.request.use( async (config) => {
    
    // Chúng ta không kiểm tra access token ở 2 router này
    if (config && (config.url.indexOf('/login') >= 0 || config.url.indexOf('/refreshtoken') >= 0)) {
      
      return config
    }
    const payloadAccess = $cookies.get('PayloadAccessToken')
    if (payloadAccess) {
      config.headers = {
        Authorization: `AccessToken.Header.Payload ${payloadAccess}`
      }
    }

    return config

  }, error => {

    return Promise.reject(error)
  });


  instance.interceptors.response.use(async (response) => {

    const { code } = response.data
    const config = response.config
    if (config && (config.url.indexOf('/login') >= 0 || config.url.indexOf('/refreshtoken') >= 0)) {
      // console.log(response.data);
      return response
    }
    if (code && code === 401) {
      try {

        await setNewAccessToken($cookies.get('PayloadRefreshToken'))
        console.log("Invailid Token!!");
        return instance(config)

      }
      catch(err) {
        console.log(err);
      }

    }

    if (code && code === 500) {
      console.log("Bad request!!!", response.data);
    }


    return response
  }, error => {

    return Promise.reject(error)
  });

  return instance
};

async function setNewAccessToken (token) {
 const api = createApiAdmin(`/api/admin/staff`)
 return (await api.get(`/refreshtoken`, 
 {
   headers: {
     Authorization: `RefreshToken.Header.Payload ${token}`
   },

 }
 )).data
}

// async function getStaffWithAccessToken (token) {
//   const api = createApiAdmin(`/api/admin/staff`)
//   return (await api.get(`/get-staff`, 
//     {
//       headers: {
//         Authorization: `AccessToken.Header.Paload ${token}`
//       },

//     }
//     )).data
//  }


export default createApiAdmin
