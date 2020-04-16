import React from 'react';
import { shallow } from 'enzyme';
import Input from '../common/Input';

//shallow permitir props, state

describe('<Input/>', () => { // Test suite
    it('Simple Rendering', () =>{
        const component = shallow(<Input/>);
        expect(component).toMatchSnapshot();
    });

    it('test props', ()=> {
        const component = shallow(<Input label="Nombre:"/>);
        expect(component.find('.title-label').text()).toBe("Nombre:");
    })
});