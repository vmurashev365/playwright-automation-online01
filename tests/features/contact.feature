Feature: Contact Form
  In order to send messages to the hotel
  As a visitor
  I want to fill and submit the contact form

  Background:
    Given I open the homepage

  Scenario: Submit contact form with valid data
    When I scroll to the Contact section
    And I fill the "Name" field with "John Doe"
    And I fill the "Email" field with "john.doe@example.com"
    And I fill the "Phone" field with "012345678901"
    And I fill the "Subject" field with "Test Subject"
    And I fill the "Message" field with "Hello, this is a test!"
    And I click the "Submit" button on the contact form
    Then I should see a success message "Thanks for getting in touch"

  Scenario: Prevent submission with invalid email
    When I scroll to the Contact section
    And I fill the "Name" field with "Jane"
    And I fill the "Email" field with "invalidEmail"
    And I fill the "Phone" field with "012345678901"
    And I fill the "Subject" field with "Invalid Email Test"
    And I fill the "Message" field with "Hello, this is a test!"
    And I click the "Submit" button on the contact form
    Then I should see an error about invalid email
    And the form should not be submitted
