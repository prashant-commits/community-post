import {createContext, useContext, useEffect, useState} from "react"
import {Md5} from "ts-md5";

type AppProviderProps = {
    children: React.ReactNode;
}

const AppContext = createContext<AppValues | undefined>(undefined)

const AppProvider: React.FC<AppProviderProps> = ({children}) => {
    const [users, setUsers] = useState<User[]>([])
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        localStorage.setItem("users", JSON.stringify(users))
    }, [users])

    useEffect(() => {
        const usersStr = localStorage.getItem("users")

        if(!usersStr) return;
        const parsed  = JSON.parse(usersStr) as User[];
        if(typeof parsed === "object" && parsed[0]) {
            setUsers(parsed)
        }
        
    }, [])

    const createUser = async (email: string, username: string, password: string) => {
        const findUser = users.find((_) => {
            return _.username === username || _.email === email
        })

        if(findUser) {
            throw new Error("User already exists");
        }
        
        const nUser: User =  {
                username: username, 
                email: email, 
                hash: Md5.hashStr(JSON.stringify({email, username, password})), 
                createdAt: Date.now(), 
                lastedLogin: Date.now()
            }

        setUsers(prev => [
            ...prev, 
            nUser
        ])

        setUser(nUser)

        return nUser;
    }

    const loginUser =async (usernameOrEmail:string, password: string) => {
        const findUser = users.find(({username, email}) => {
            return username === usernameOrEmail || email === usernameOrEmail
        })

        if(!findUser) {
            throw new Error("User not found");
        }

        const hash = Md5.hashStr(JSON.stringify({
            email: findUser.email, 
            username: findUser.username, 
            password
        }))

        if(hash !== findUser.hash) {
            throw new Error("Password is incorrect");
        }

        setUser(findUser);

        return findUser;
    }

    return <AppContext.Provider value={{user, createUser, loginUser}}>
        {children}
    </AppContext.Provider>
} 

export default AppProvider;

export const useApp = () => {
    const context = useContext(AppContext);

    if(context === undefined) {
        throw new Error("Trying to access useApp outside the AppProvider")
    }

    return context;
}