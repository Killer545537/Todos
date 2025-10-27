'use client';

import { createContext, type ReactNode, useContext, useState } from 'react';

type FilterLoadingContextType = {
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
};

const FilterLoadingContext = createContext<
    FilterLoadingContextType | undefined
>(undefined);

export const FilterLoadingProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <FilterLoadingContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
        </FilterLoadingContext.Provider>
    );
};

export const useFilterLoading = () => {
    const context = useContext(FilterLoadingContext);
    if (context === undefined) {
        throw new Error(
            'useFilterLoading must be used within a FilterLoadingProvider',
        );
    }
    return context;
};
