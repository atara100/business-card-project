import { getToken, verifyToken } from "../auth/tokenManager";

export const serverUrl='http://localhost:3000/';

const  handleRequest = (url:string, method:string,headers?:HeadersInit,data?:object, checkToken=true): Promise<Response> | null =>
{
  if(checkToken && !verifyToken()){
        return null;
  }

    const config={
      method, 
      headers:{
        ...headers,
        'x-auth-token': getToken()
      },
      body: (data) ? JSON.stringify(data) : null
    }

    return fetch(url, config);
}

export const postRequest = (endPoint:string, data:object,checkToken?:boolean): Promise<Response> | null=>{
  return handleRequest(`${serverUrl}${endPoint}`,'POST',{'content-type': 'application/json'},data,checkToken);
}