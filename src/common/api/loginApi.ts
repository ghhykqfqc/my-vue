import api from "../ts/request";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface LoginResponse<T = any> {
    code: number;
    data: T;
    message: string;
}
const request = api<unknown, LoginResponse>();
export default function login(requestParams: object): Promise<LoginResponse> {
    return request.post('/api/login', requestParams)
}