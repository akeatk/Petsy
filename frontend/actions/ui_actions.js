export const SHOW_LOGIN = 'SHOW_LOGIN';
export const SHOW_SIGNUP = 'SHOW_SIGNUP';
export const SHOW_NONE = 'SHOW_NONE';
export const CLICK_DROPDOWN ='SHOW_DROPDOWN';
export const HIDE_DROPDOWN = 'HIDE_DROPDOWN';
export const SHOW_ABOUT = 'SHOW_ABOUT';
export const HIDE_ABOUT = 'HIDE_ABOUT';

export const showLogin = () => dispatch => dispatch({ type:SHOW_LOGIN });
export const showSignup = () => dispatch => dispatch({ type:SHOW_SIGNUP });
export const showNone = () => dispatch => dispatch({ type:SHOW_NONE });

export const clickDropdown = () => dispatch => dispatch({type:CLICK_DROPDOWN});
export const hideDropdown = () => dispatch => dispatch({type:HIDE_DROPDOWN});

export const showAbout = () => dispatch => dispatch({type:SHOW_ABOUT});
export const hideAbout = () => dispatch => dispatch({type:HIDE_ABOUT});
