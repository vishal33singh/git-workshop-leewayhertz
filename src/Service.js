import axios from "axios";
import { commonUtil } from "./Api";
const BASEURL = commonUtil.BASEURL();


function userInfo() {
    const configData = {
      headers: { 'content-type': 'application/json' }
    }
    return axios.get(BASEURL + 'events' , configData, { params: ["PUBLISHED", "UPCOMING", "PAST"], }).then(res => res.data)
  }

  export default userInfo;