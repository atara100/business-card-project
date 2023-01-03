export const TOKEN_KEY='token';

export const setToken=(token:string)=>{
  localStorage.setItem(TOKEN_KEY,token);
}

export const getToken=()=>{
  return localStorage.getItem(TOKEN_KEY )|| "";
}

//check if thre is token
export const verifyToken= ():boolean =>{
    const token=getToken();
    return token.length > 0 ;
}

export const removeToken =()=>{
  return  localStorage.removeItem(TOKEN_KEY);
}