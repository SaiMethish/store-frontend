export interface Register{
    firstName:string,
    lastName:string,
    username:string,
    password:string,
    role:string
}

export interface Login{
    username:string,
    password:string
}

export interface AuthResponse{
    access_token:string,
    refresh_token:string,
    message:string,
    status:number,
    expirationTime:{
        accessToken:string,
        refreshToken:string
    }
}
