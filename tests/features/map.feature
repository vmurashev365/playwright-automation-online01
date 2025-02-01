Feature: Map
  In order to see the hotel's location
  As a visitor
  I want to view and interact with the map on the homepage

  Background:
    Given I open the homepage

  Scenario: Map is displayed
    When I scroll down to the Map section
    Then the map should be visible
    And there should be no major console errors

  Scenario: Zoom the map
    When I scroll down to the Map section
    And I zoom the map
    Then the map should respond without crashing
