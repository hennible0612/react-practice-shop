import {createContext, useState} from "react";



// actual value you want to access
export const UserContext = createContext({ //defaultValue
    currentUser: null,
    setCurrentUser: () => null,
});

// .Provider 컴포넌트이다. 필요한 값이 있으면 해당 컴포넌트를 둘러싼다.
export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser]= useState(null);
    const value = {currentUser, setCurrentUser}

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};

// 아래처럼 app은 UserProvider의 children이 된다.
// <UserProvider>
//     <app />
// </UserProvider>