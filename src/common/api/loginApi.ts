/* eslint-disable @typescript-eslint/no-explicit-any */
import request from "../ts/request";

export default function login(requestParams: object): Promise<any> {
    return request.post('/api/login', requestParams)
}