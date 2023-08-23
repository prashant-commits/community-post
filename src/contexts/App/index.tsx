import {createContext, useContext} from "react"

type AppProviderProps = {
    children: React.ReactNode;
}

const AppContext = createContext<AppValues | undefined>(undefined)

const AppProvider: React.FC<AppProviderProps> = ({children}) => {
    const [posts, setPosts] = useState()

    return <AppContext.Provider value={{}}>
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