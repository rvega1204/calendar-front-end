import { types } from '../../types/types';


describe('pruebas en types', () => {
   
    test('los types deben de ser iguales', () => {
        expect( types ).toEqual({
            uiOpenModal: '[ui] Open modal',
            uiCloseModal: '[ui] Close modal',
        
            eventSetActive: '[event] Set Active',
            eventLogout: '[event] Logout',
            eventStartAddNew: '[event] Start add new',
            eventAddNew: '[event] Add new',
            eventClearActiveEvent: '[event] Clear active event',
            eventUpdated: '[event] Event updated',
            eventDeleted: '[event] Event deleted',
            eventLoaded: '[event] Event loaded',
        
            authChekingFinish: '[auth] Finish checking login state',
            authStartLogin: '[auth] Start login',
            authLogin: '[auth] Login',
            authStartRegister: '[auth] Start register',
            authStartTokenRenew: '[auth] Start token renewal',
            authLogout: '[auth] Logout',
        }); 
    });
    
});
