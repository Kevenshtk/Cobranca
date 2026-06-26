import { useContext } from 'react';
import { ServiceContext } from '../context/serviceContext';

export function useServiceContext() {
    const context = useContext(ServiceContext);

    if(!context) {
        throw new Error("useServiceContext deve ser usado dentro de ServiceContextProvider");
    }

    return context;
}