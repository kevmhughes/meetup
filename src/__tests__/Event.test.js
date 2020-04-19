import React from 'react';
import { shallow } from 'enzyme';

import Event from '../Event';

describe('<Event /> component', () => {

    let EventWrapper;
    const events = 
        {
          created: 1563825339000,
          duration: 9000000,
          id: "263370107",
          name: "Microservices mit dem MicroProfile 3.x",
          rsvp_limit: 80,
          date_in_series_pattern: false,
          status: "upcoming",
          time: 1566925200000,
          local_date: "2019-08-27",
          local_time: "19:00",
          updated: 1563825339000,
          utc_offset: 7200000,
          waitlist_count: 79,
          yes_rsvp_count: 80,
          venue: {
          id: 26266792,
          name: "adesso AG",
          lat: 53.54524230957031,
          lon: 9.950983047485352,
          repinned: false,
          address_1: "Große Elbstraße 36",
          city: "Hamburg",
          country: "de",
          localized_country_name: "Deutschland"
          },
          group: {
          created: 1387402147000,
          name: "Java User Group Hamburg",
          id: 11500362,
          join_mode: "open",
          lat: 53.54999923706055,
          lon: 10,
          urlname: "jug-hamburg",
          who: "Mitglieder",
          localized_location: "Hamburg, Deutschland",
          state: "",
          country: "de",
          region: "de_DE",
          timezone: "Europe/Berlin"
          },
          link: "https://www.meetup.com/de-DE/jug-hamburg/events/263370107/",
          description: "<p>Wer Microservices in Java entwickeln möchte, muss nicht zwangsläufig zu Spring Boot greifen. Es lohnt ein Blick auf alternative Frameworks, die in zunehmender Anzahl verfügbar sind und bezüglich ihrer Funktionalität stark aufholen. So schreitet auch die Entwicklung des MicroProfiles weiter voran. In beeindruckender Geschwindigkeit wurden zahlreiche APIs entwickelt, die (nicht nur) für die Entwicklung von Microservices sehr hilfreich sind.<br/>Hierzu zählen die Unterstützung von Metriken, Health Checks, Fault Tolerance und JSON Web Tokens. Für den Einsatz im Projekt kann aus unterschiedlichen Implementierungen wie TomEE, Thorntail oder OpenLiberty gewählt werden. In dieser Live-Coding-Session wird der praktische Einsatz von MicroProfile anhand eines Praxisbeispiels demonstriert.<br/> <br/> <br/>Referent:<br/>Thilo Frotscher arbeitet als freiberuflicher Softwarearchitekt und Trainer. Als Experte für Enterprise Java und Systemintegration unterstützt er seine Kunden überwiegend durch Entwicklung, Reviews oder die Durchführung von Schulungen. Thilo ist (Co-)Autor mehrerer Bücher in den Bereichen Java EE, (Web) Services und Systemintegration, hat zahlreiche Fachartikel verfasst und spricht regelmäßig auf Fachkonferenzen und Schulungsveranstaltungen oder bei Java User Groups.</p> ",
          visibility: "public",
          member_pay_fee: false
        }

        beforeAll(() => {
            EventWrapper = shallow(<Event event={events} />);
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
            EventWrapper.find('.details-btn').simulate('click');
            expect(EventWrapper.find('showDetails')).toHaveLength(0);
        });
        
        test('render enough information', () => {
          expect(EventWrapper.find('.event')).toHaveLength(1);
          expect(EventWrapper.find('.time')).toHaveLength(1);
          expect(EventWrapper.find('.name')).toHaveLength(1);
          expect(EventWrapper.find('.group-name')).toHaveLength(1);
          expect(EventWrapper.find('.going')).toHaveLength(1);
        });

});