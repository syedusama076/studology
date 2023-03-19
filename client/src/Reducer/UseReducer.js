export const initialState = null;

export const reducerFun = (state, action) => {
    if (action.type !== undefined) {
        return action.type;
    }
    return state;
};