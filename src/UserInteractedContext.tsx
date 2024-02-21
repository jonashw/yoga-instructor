import React, { createContext, useEffect, useState } from "react";
export const UserInteractedContext = createContext<boolean>(false);

export const UserInteractedProvider  = ({children}: {children: React.ReactElement}) => {
    const [value, setValue] = useState<boolean>(false);
    const eventNames = [
        "click"
        //,"mousemove"
        //,"mouseover"
        //,"mousemove"
        //,"touchmove"
        ,"focus"
    ];
    const onUserEvent = () => {
        if(value){
            return;
        }
        console.log('user has interacted');
        setValue(true);
        for(let eventName of eventNames){
            window.removeEventListener(eventName, onUserEvent); 
        }
    };

    useEffect(() => {
        for(let eventName of eventNames){
            window.addEventListener(eventName, onUserEvent); 
        }
    }, [])

    return (
        <UserInteractedContext.Provider value={value}>
            {children}
        </UserInteractedContext.Provider>
    );
};