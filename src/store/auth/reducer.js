import {createReducer, isAnyOf} from '@reduxjs/toolkit';
import {signIn, signUp, signOut, clearError, authenticatedUser} from './actions.js';

const initialState = {
  user: {}
};


const reducer = createReducer(initialState, builder => {
  builder.addCase(signIn.fulfilled, (state, action) => {
    state.user  =  action.payload;
  });

  // builder.addCase(authenticatedUser.fulfilled, (state, action) => {
  //   state.user  =  action.payload;
  // });

  builder.addCase(signUp.fulfilled, (state, action) => {
    state.user  = action.payload;
  });

  builder.addCase(signOut.fulfilled, (state, action) => {
   if(action.payload === true) state.user = {};
  });

  builder.addCase(clearError, state => {
    state.user = {}
  } )
  builder.addMatcher(
      isAnyOf(
        signIn.fulfilled,
        authenticatedUser.fulfilled
      )
      ,
      (state, action) => {
        state.user  =  action.payload;
      }
  );

});
export { reducer };
