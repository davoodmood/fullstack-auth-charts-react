import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext<any>({});

export default function SearchProvider({children}) {
    const search = useProvideSearch();
    return (
        <SearchContext.Provider value={search}>
            {children}
        </SearchContext.Provider>
    )
}

export const useSearch = () => {
    return useContext(SearchContext)
}

function useProvideSearch() {
    const [search, setSearch] = useState('')
    const onSearch = (event) => {
        event.preventDefault();
        setSearch(event.target?.value);
        return event?.target?.value;
    }
    return {
        search,
        onSearch
    }
}
