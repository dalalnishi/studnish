const init={

}

export const LISTING_SUCCESS='LISTING_SUCCESS';
export const LISTING_FAIL='LISTING_FAIL';

export default(state=init,action)=>{
    switch(action.type){
        case 'LISTING_SUCCESS':
            return;
        case 'LISTING_FAIL':
            return;
        default:
            return state;
    }
}