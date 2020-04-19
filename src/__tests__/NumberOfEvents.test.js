import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  
    let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents updateEvents={() => {}}/>);
  });

  test('number-of-events element is rendered', () => {
    expect(NumberOfEventsWrapper.find('.number-of-events')).toHaveLength(1);
  });

  test('number-of-events-input is rendered', () => {
    expect(NumberOfEventsWrapper.find('.number-of-events input')).toHaveLength(1);
  });

  test('32 is the default number of events', () => {
    expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(32);
  });
  
  test('state changes when input changes', () => {
    const eventObject = { target: { value: 24 }};
    NumberOfEventsWrapper.find('.number-of-events input').simulate('change', eventObject);
    expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(24);
  });


});