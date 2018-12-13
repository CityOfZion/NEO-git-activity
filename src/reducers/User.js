const initState = {isLoading: false, list: [], err: "", project:""};

export default function User(state = initState, action) {
    switch (action.type) {
        case 'FETCH_USERS_REQUEST':
          return {
            ...state,
            isLoading: true
          };
    
        case 'FETCH_USERS_SUCCESS': 
          return {
            ...state,
            isLoading: false,
            err: '',
            list: action.data
          };
    
    
        case 'FETCH_USERS_FAILURE': 
          return {
            ...state,
            isLoading: false,
            err: action.error
          };
    
        default:
          return state;
    }
}
