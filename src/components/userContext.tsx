import { createContext, useState, type PropsWithChildren } from "react"

export type User = {

    verifyAdmin: (firstName: string, lastName: string) => void;
    isAdmin: boolean
}

export type UserProviderProps =  PropsWithChildren & {}

export const UserContext = createContext<User | undefined>(undefined)

export const UserProvider = ({children}: UserProviderProps) => {
    const [isAdmin, setIsAdmin] = useState(false)

    const verifyAdmin = (firstName: string, lastName: string) => {
        if(firstName === "tata" && lastName === "toto"){
            setIsAdmin(true)
        } else {
            setIsAdmin(false)
        }
    }

    return(
        <UserContext.Provider value={{isAdmin, verifyAdmin}}>
            {children}
        </UserContext.Provider>
    )
}