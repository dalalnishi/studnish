import baseService from './baseService';

export function login(credentials){
    return baseService.post('/login',credentials)
}