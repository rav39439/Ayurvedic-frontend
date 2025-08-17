import React from "react"
import { useState } from "react"


export const dataProvider=React.createContext({text:null})

export const DataProviderComponent=({children})=>{

    const [data,setData]=useState({data:"test"})

    return(
    <dataProvider.Provider value={{data ,setData}}>

        {children}
    </dataProvider.Provider>
    )

}

