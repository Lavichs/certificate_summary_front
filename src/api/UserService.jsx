import axios from "axios";
import {AUTHORIZATION_URI, CHECK_COOKIE} from "./api_uri";

export default class UserService {
    static async login({login, password}) {
        return await axios.post(AUTHORIZATION_URI, {
            username: login,
            password
        }, {withCredentials: true})
    }

    static async checkCookie() {
        return await axios.get(CHECK_COOKIE, {withCredentials: true})
    }
}