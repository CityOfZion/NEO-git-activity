const initState = {isloading: false, list: [], err: "", project:""};

export default function Project(state = initState, action) {
    switch (action.type) {
        case 'FETCH_PROJECTS_REQUEST':
          return {
            ...state,
            isloading: true
          };
    
        case 'FETCH_PROJECTS_SUCCESS': 
          return {
            isloading: false,
            err: '',
            list: action.data
          };
    
    
        case 'FETCH_PROJECTS_FAILURE': 
          return {
            ...state,
            isloading: false,
            err: action.error
          };
    
        default:
          return state;
    }
}
