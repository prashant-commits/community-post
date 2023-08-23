type AppValues = {
    user: User | null;
    createUser: (email:string, username: string, password: string) => Promise<User>;
    loginUser: (usernameOrEmail: string, password: string) => Promise<User>
}

type User = {
    username: string,
    email: string,
    createdAt: number,
    lastedLogin: number,
    hash: string
}