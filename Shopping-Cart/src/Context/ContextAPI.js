import { createContext, useReducer} from "react";
import {faker} from '@faker-js/faker';
import { FilterReducer } from "../reducers/FilterReducer";

export const FilterContext = createContext();
faker.seed(99);

const ContextAPI = ({children}) => {
    const INITIAL_FILTER_STATE =
    {
        byStock : false,
        byFastDelivery: false,
        byRating: 0,
        searchItem: "",
        sort: ""
    }

    const[FilterState,FilterDispatch] = useReducer(FilterReducer,INITIAL_FILTER_STATE);

    return(
        <FilterContext.Provider value = {{FilterState,FilterDispatch}}>
            {children}
        </FilterContext.Provider>
    )
};

export default ContextAPI;