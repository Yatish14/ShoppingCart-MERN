export const FilterReducer = (state,action) => {
    switch(action.type){
      case "Sort_by_Price":
          return{...state,sort: action.payload};
      case "Filter_by_Stock":
          return{...state,byStock: !state.byStock};
      case "Filter_by_FastDelivery":
          return{...state,byFastDelivery: !state.byFastDelivery};
      case "Filter_by_Rating":
          return{...state,byRating: action.payload};
      case "Filter_by_Search":
          return{...state,searchItem: action.payload};
      case "Clear_Filters":
          return{
              byStock : false,
              byFastDelivery: false,
              byRating: 0,
              searchItem: ""
          };
      default:
          return state;
    }
  };