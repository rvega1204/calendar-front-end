import { uiReducer } from '../../reducers/uiReducer';
import { uiCloseModal, uiOpenModal } from '../../actions/ui';

const initState = {
    modalOpen: false
};

describe('pruebas en uiReducer', () => {
   test('debe de retornar el estado por defecto', () => {
       const state = uiReducer( initState, {} );
       expect( state ).toEqual( initState );

   });

   test('debe de abrir y cerrar el modal', () => {
       const modalOpen = uiOpenModal();
       const state = uiReducer( initState, modalOpen );

       expect( state ).toEqual({ modalOpen: true });

       const modalClose = uiCloseModal();
       const stateClose = uiReducer( state, modalClose );

       expect( stateClose ).toEqual({ modalOpen: false });
   });
   
    
});
