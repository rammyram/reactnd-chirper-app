const logger  = (store) => (next) => (action) =>{
    console.group(action.type)
        console.log('The Action :' , action.type )
        let dispathResult = next(action)
        console.log('The new state: ', store.getState())
    console.groupEnd()

    return dispathResult
}


export default logger