import React from 'react';
import { shallow } from 'enzyme';

import Event from '../Event';

describe('<Event /> component', () => {

    let EventWrapper;
    const events = 
        {
            created: 1466587098000,
            duration: 14400000,
            id: "knlmvlyvlbnb",
            name: "Afterwork rooftop party every wednesday with djs.  Free entrance.",
            rsvp_limit: 250,
            date_in_series_pattern: false,
            status: "past",
            time: 1470844800000,
            local_date: "2016-08-10",
            local_time: "18:00",
            updated: 1470861082000,
            utc_offset: 7200000,
            waitlist_count: 0,
            yes_rsvp_count: 55,
            venue: {
                    id: 8044082,
                    name: "Hotel Renaissance",
                    lat: 41.39273452758789,
                    lon: 2.167202949523926,
                    repinned: false,
                    address_1: "Pau Claris 122, 08009",
                    city: "Barcelona",
                    country: "es",
                    localized_country_name: "España"
                },
        }

        beforeAll(() => {
            EventWrapper = shallow(<Event event={events} />);
        });  

        test('if componet is rendered', () => {
            expect(EventWrapper).toHaveLength(1);
          });

        test('if event container is rendered', () => {
            expect(EventWrapper.find('.event')).toHaveLength(1);
        });
        
        test('that show/hide details-btn is rendered', () => {
            expect(EventWrapper.find('.details-btn')).toHaveLength(1);
          });

        test('event-details is not rendered by default', () => {
            expect(EventWrapper.state('showDetails')).toEqual(false);
            expect(EventWrapper.find('.event-details')).toHaveLength(0);
          });

        test('clicking on details button expands event details', () => {
            expect(EventWrapper.state('showDetails')).toEqual(false);
            EventWrapper.find('.details-btn').simulate('click');
            expect(EventWrapper.find('.event-details')).toHaveLength(1);
        });

        test('clicking on details button closes event details', () => {
            EventWrapper.setState({
                showDetails: true
              });
            expect(EventWrapper.state('showDetails')).toEqual(true);
            EventWrapper.find('.details-btn').simulate('click');
            expect(EventWrapper.state('showDetails')).toEqual(false);
        });

});