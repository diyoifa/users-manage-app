export interface UserAuthenticated {
    id: string,
    username: string,
    email: string,
    token: string,
    token_type: string
}

export interface User {
        id: string,
        username: string,
        email: string
}

export interface UserInfo {
    id: string,
    username: string,
    email: string
    showForm: boolean
}

export interface UserData {
    username?: string;
    email?: string;
    password?: string;
  }

export interface Users {
    users: User[]
}

export interface UserLogin {
    email: string,
    password: string,
}

export interface UserRegister {
    username: string,
    email: string,
    password: string,
}