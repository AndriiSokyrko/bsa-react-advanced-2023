import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import { ActionType } from './common.js';
import {notification} from '../../services/services'


const clearError = createAction('clear-error');

const signIn = createAsyncThunk(
  ActionType.SIGN_IN,
  async (request,  {extra: {services } }) => {
        try {
            const {token, user} = await services.auth.signIn({path: 'sign-in', request});
            services.storage.setItem('TOKEN', token);
            return {...user,error:null};

        } catch (e) {
            const e_ = JSON.parse(e)
            notification.error(e_.message,'Info')
            clearError();
            return {id:null,error: e_.message}
        }
  }
);

const signUp = createAsyncThunk(
  ActionType.SIGN_UP,
    async (request, { extra: { services } }) => {
       try {
          const {token, user} = await services.auth.signUp({path: 'sign-up', request})
          services.storage.setItem('TOKEN', token);
          return {...user,error:null};
      } catch (e) {
           const e_ = JSON.parse(e)
          notification.info(e_.message, 'Info',500);
          clearError()
          return {id:null,error: e_.message}
      }
  }
);

const signOut = createAsyncThunk(
  ActionType.SIGN_OUT,
    async (request, {extra: {services}}) => {
        try {
            services.storage.removeItem('TOKEN');
            return;
        } catch (e) {
            const e_ = JSON.parse(e)
            notification.info(e_.message, 'Info', 1000);
            clearError()
            return {id: null, error: e_.message}
        }
    }
);


const authenticatedUser = createAsyncThunk(
  ActionType.SIGN_IN,
    async (request, {extra: {services}}) => {
        try {
            const user = await services.auth.authenticatedUser({path: 'authenticated-user'});
            return {...user, error: null};
        } catch (e) {
            notification.info(e.message, 'Info', 1000);
            clearError()
            return {id: null, error: e.message}
        }
    }
);

export { signIn, signOut, signUp, authenticatedUser, clearError };
