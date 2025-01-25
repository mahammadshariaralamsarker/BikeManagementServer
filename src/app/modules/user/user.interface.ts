 

export type TUser = {
    name: string,
    email: string,
    password: string,
    role: 'admin' | 'customer',
    isBlocked: boolean,
}

export type TPassword = {
    currentPassword:string,
    newPassword:string
}
