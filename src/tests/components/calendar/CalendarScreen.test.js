import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { CalendarScreen } from '../../../components/calendar/CalendarScreen';
import { messages } from '../../../helpers/calendar-messages-es';
import { types } from '../../../types/types';
import { eventSetActive } from '../../../actions/events';
import { act } from '@testing-library/react';


jest.mock('../../../actions/events', () => ({
    eventSetActive: jest.fn(),
    eventStartLoading: jest.fn()
}));
Storage.prototype.setItem = jest.fn();

const middlewares = [thunk];
const mockStore = configureStore( middlewares );
const initState = {
    calendar: {
        events: []
    },
    auth: {
        uid: '123',
        name: 'nombre prueba'
    },
    ui: {
        openModal: false
    }
};
const store = mockStore( initState );
store.dispatch = jest.fn();
const wrapper = mount(
    <Provider store={ store }>
        <CalendarScreen />
    </Provider>
);

describe('pruebas en <CalendarScreen />', () => {
    test('debe de mostrarse correctamente', () => {
        expect( wrapper ).toMatchSnapshot();
    });

    test('debe de probar las interacciones del calendario', () => {
        const calendar = wrapper.find('Calendar');
        const calendarMessages = calendar.prop('messages');

        expect( calendarMessages ).toEqual( messages );

        calendar.prop( 'onDoubleClickEvent' )();
        expect( store.dispatch ).toHaveBeenCalledWith({ type: types.uiOpenModal });

        calendar.prop( 'onSelectEvent' )({ start: 'hola' });
        expect( eventSetActive ).toHaveBeenCalledWith({ start: 'hola' });
        
        act(() => {
            calendar.prop( 'onView' )( 'week' );
            expect( localStorage.setItem ).toHaveBeenCalledWith( 'lastView', 'week' );
        });
        
    });
    
     
});
