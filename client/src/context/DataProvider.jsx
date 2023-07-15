import { useEffect, useState } from 'react';
import {createContext} from 'react';
import { getMe } from '../services/api';
import { Toaster } from 'react-hot-toast';

export const DataContext = createContext(null);

const DataProvider =({children})=>{
    const [accountEmail,setAccountEmail] = useState("");
    
    

    return (
        <DataContext.Provider value={{
            accountEmail,
            setAccountEmail
        }}>
            {children}
            <Toaster/>
        </DataContext.Provider>
    )
}
export default DataProvider;
