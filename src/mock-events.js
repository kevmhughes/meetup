const mockEvents = {
    city: {
      id: 1007700,
      city: "München",
      lat: 48.14,
      lon: 11.58,
      state: "",
      country: "de",
      zip: "meetup3",
      member_count: 1257
    },
    events:[
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
        description: "Good times to be had",
        visibility: "public",
        member_pay_fee: false
      }
    ]
  };
  
  export { mockEvents };