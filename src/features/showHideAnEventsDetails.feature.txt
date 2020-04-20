Feature: Show or hide event details

Scenario: An event element is collapsed by default
  Given the user did not expand any event
  And the app is loaded
  When all the events are loaded
  Then all the event elements are collapsed and the user isn't able to see their details

Scenario: User can expand an event to see its details
  Given the app is loaded
  And all the events are loaded
  When the user clicks Show details button of the event
  Then the event description section expands to reveal all the event details

Scenario: User can collapse an event to hide its details
  Given the app is loaded
  And the user expanded event's details
  When the user clicks Hide details button
  Then the event description collapses
  