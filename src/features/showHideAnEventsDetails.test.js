
import React from 'react';
import { mount } from 'enzyme';
import { loadFeature, defineFeature } from 'jest-cucumber';

import App from '../App';

import { mockEvents } from '../mock-events';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature.txt');

defineFeature(feature, test => {
    
    test('An event element is collapsed by default', ({ given, and, when, then }) => {
      given('the user did not expand any event', () => { });
      let AppWrapper;
  
      and('the app is loaded', () => {
        AppWrapper = mount(<App />);
      });
  
      when('all the events are loaded', () => {
        AppWrapper.update();
        expect(AppWrapper.find('.event')).toHaveLength(mockEvents.events.length);
      });
  
      then('all the event elements are collapsed and the user isn\'t able to see their details', () => {
        expect(AppWrapper.find('expanded')).toHaveLength(0);
      });
    });

    test('User can expand an event to see its details', ({ given, and, when, then }) => {
        let AppWrapper;
        given('the app is loaded', () => {
            AppWrapper = mount(<App />);
    	});

    	and('all the events are loaded', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.event')).toHaveLength(mockEvents.events.length);
    	});

    	when('the user clicks Show details button of the event', () => {
            AppWrapper.find('.event .details-btn').at(0).simulate('click');
    	});

    	then('the event description section expands to reveal all the event details', () => {
            expect(AppWrapper.find('.event .main-info')).toHaveLength(1);
    	});
    });

    test('User can collapse an event to hide its details', ({ given, and, when, then }) => {
        let AppWrapper;
        given('the app is loaded', () => {
            AppWrapper = mount(<App />);
    	});

    	and('the user expanded event\'s details', () => {
            AppWrapper.update();
            AppWrapper.find('.event .details-btn').at(0).simulate('click');
            expect(AppWrapper.find('.event .event-details')).toHaveLength(1);
    	});

    	when('the user clicks Hide details button', () => {
            AppWrapper.find('.event .details-btn').at(0).simulate('click');
    	});

    	then('the event description collapses', () => {
            expect(AppWrapper.find('.event .event-details')).toHaveLength(0);
    	});
    });
});