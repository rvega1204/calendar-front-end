import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { startChecking, startLogin, startRegister } from '../../actions/auth';
import { types } from '../../types/types';
import Swal from 'sweetalert2';
import * as fetchModule from '../../helpers/fetch';

jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore( middlewares );

const initState = {};
let store = mockStore( initState );
Storage.prototype.setItem = jest.fn();

describe('pruebas en las acciones auth.js', () => {
    
    beforeEach(() => {
        store = mockStore( initState );
        jest.clearAllMocks();
    });

    test('debe de funcionar startLogin', async() => {
        await store.dispatch( startLogin( 'ric@gmail.com', '123456' ) );       

        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.authLogin,
            payload: {
                uid: expect.any(String),
                name: expect.any(String)
            }
        });

        expect( localStorage.setItem ).toHaveBeenCalledWith( 'token', expect.any(String) );
        expect( localStorage.setItem ).toHaveBeenCalledWith( 'token-init-date', expect.any(Number) );

        //token = localStorage.setItem.mock.calls[0][1]
    });

    test('debe de no funcionar el startLogin', async() => {
        await store.dispatch( startLogin( 'ric@gmail.com', '1234567' ) );
        let actions = store.getActions();
        
        expect( actions ).toEqual([]);
        expect( Swal.fire ).toHaveBeenCalledWith( 'Error', 'Password invalido', 'error' );

        await store.dispatch( startLogin( 'ric@gmaila.com', '123456' ) );
        actions = store.getActions();

        expect( Swal.fire ).toHaveBeenCalledWith( 'Error', 'El usuario no existe con ese correo', 'error' );
    });

    test('debe de de funcinar startRegister', async() => {

        fetchModule.fetchSinToken = jest.fn(() => ({
            json() {
                return {
                    ok: true,
                    uid: '123',
                    name: 'nombre prueba',
                    token: 'ABC123ABC123'
                }
            }
        }));
        await store.dispatch( startRegister( 'test2@test.com', '123456', 'test' ) );
        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'nombre prueba'
            }
        });

        expect( localStorage.setItem ).toHaveBeenCalledWith( 'token', 'ABC123ABC123' );
        expect( localStorage.setItem ).toHaveBeenCalledWith( 'token-init-date', expect.any(Number) );
    });
    
    test('debe de funcionar startChecking', async() => {

        fetchModule.fetchConToken = jest.fn(() => ({
            json() {
                return {
                    ok: true,
                    uid: '123',
                    name: 'nombre prueba',
                    token: 'ABC123ABC123'
                }
            }
        }));
        await store.dispatch( startChecking() );
        const actions = store.getActions();

        expect(actions[0] ).toEqual({
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'nombre prueba'
            }
        });

        expect( localStorage.setItem ).toHaveBeenCalledWith( 'token', 'ABC123ABC123' );
    });
    
    
    
});
