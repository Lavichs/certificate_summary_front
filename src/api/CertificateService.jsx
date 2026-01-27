import {CERTIFICATE_URI} from "./api_uri";

const axios = require('axios');


export default class CertificateService {
    static async getAll() {
        try {
            const res = await axios.get(CERTIFICATE_URI)
            return await res.data
        } catch (error) {
            return []
        }
        // return await axios.get(CERTIFICATE_URI)
    }
    static async update(id, data) {
        return await axios.put(CERTIFICATE_URI + `/` + String(id), data)
    }
    static async delete(id) {
        return await axios.delete(CERTIFICATE_URI + `/` + String(id))
    }



    // static async getAll(limit, page, searchTerm, key, direction) {
    //     let data = {
    //         limit: limit,
    //         offset: page ? (page - 1) * limit : page,
    //         filter: searchTerm,
    //         key,
    //         direction
    //     }
    //
    //     return await axios.get(CERTIFICATE_URI, {
    //         params: {
    //             ...data
    //         },
    //     });
    // }
    // static async update(id, data, token) {
    //     return await axios.put(CERTIFICATE_URI + `/` + String(id), data, {
    //         headers: {
    //             "Authorization": `Bearer ${token}`
    //         }
    //     })
    // }
    // static async delete(id, token) {
    //         return await axios.delete(CERTIFICATE_URI + `/` + String(id), {
    //             headers: {
    //                 "Authorization": `Bearer ${token}`
    //             }
    //         })
    //     }
    // static async create(data, token) {
    //     return await axios.post(CERTIFICATE_URI, data, {
    //         headers: {
    //             "Authorization": `Bearer ${token}`
    //         }
    //     })
    // }
    // static async getHistory(id) {
    //     return await axios.get(CERTIFICATE_URI + '/history/' + String(id))
    // }
    // static async getGeneralAnalytic() {
    //     return await axios.get(ANALYTIC_URI)
    // }
    // static async getAnalyticByMonth(number) {
    //     return await axios.get(ANALYTIC_URI + `/${number}`)
    // }
}