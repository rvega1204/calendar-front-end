import { fetchConToken, fetchSinToken } from '../../helpers/fetch';


describe('pruebas en el helper fetch', () => {

    let token = '';

    test('fetchSinToken debe de funcionar', async() => {
        const resp = await fetchSinToken( 'auth', { email: 'ric@gmail.com', password: '123456' }, 'POST' );
        expect( resp instanceof Response ).toBe( true );

        const body = await resp.json();
        expect( body.ok ).toBe( true );

        token = body.token;
        
    });

    test('fetchConToken debe de funcionar', async() => {

        localStorage.setItem( 'token', token );

        const resp = await fetchConToken( 'events/60e9d6d287b8303ec67d89fa', {}, 'DELETE' );
        const body = await resp.json();

        expect( body.msg ).toBe( 'Evento no existe con ese id' );
          
    });
     
});
