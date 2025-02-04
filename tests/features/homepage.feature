Feature: Home Page Validation
  In order to validate the main homepage features
  As a user
  I want to see correct banner behavior and room details

  Background:
    Given I open the homepage

  @banner
  Scenario: Collapse the main banner
    Then I should see a banner with text "Welcome to Restful Booker Platform"
    When I click the "Let me hack!" button on the homepage
    Then the banner should disappear

  @rooms
  Scenario: Check room details and booking button
    When I scroll down to the Rooms section
    Then I should see the room type "single"
    And I should see the amenities:
      | TV   |
      | WiFi |
      | Safe |
      
    And I should see a button "Book this room"
    When I click the "Book this room" button on the homepage
    Then I should see a booking form or modal
