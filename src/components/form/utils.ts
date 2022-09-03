export const isFunction = (func:any) => {
    if(!func){
        return false
    }
    return typeof func === 'function';
}