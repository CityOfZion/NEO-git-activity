const initState = {isloading: false, list: [], err: "", commit:""};

export default function Commit(state = initState, action) {
    switch (action.type) {
        case 'FETCH_COMMITS_REQUEST':
          return {
            ...state,
            err: "",
            isloading: true
          };
    
        case 'FETCH_COMMITS_SUCCESS': 
          return {
            isloading: false,
            err: '',
            list: action.data
          };
    
    
        case 'FETCH_COMMITS_FAILURE':
          return {
            ...state,
            isloading: false,
            err: action.error
          };
    
        default:
          return state;
    }
}
