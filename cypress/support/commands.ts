/// <reference types="cypress" />

import * as cypress from "cypress" 
import {Selectors} from "../support/supportingvar"
const selSlob = new Selectors();

Cypress.Commands.add( "openBaseUrl", ()=>{ 
    cy.visit('/') 
    //cy.visit('https://airmalta.com/en-mt')
    cy.on('uncaught:exception', (err, runnable) => {
        return false
    })    
    cy.url().should('contains', 'airmalta.com')
    cy.get(selSlob.acepCookie).click()
})

// Select trip type and class 
Cypress.Commands.add('selectTripTypeandClass', (tripType:string, tripClass:string) =>{
    //cy.get(selSlob.ddmTypeClass).first().children().type(tripType)
    cy.get(selSlob.ddmTypeClass).eq(0).type(tripType)
    cy.get(selSlob.selTypeClass).contains(tripType).click()
    //cy.get(selSlob.ddmTypeClass).last().children().type(tripClass)
    cy.get(selSlob.ddmTypeClass).eq(1).type(tripClass)
    cy.get(selSlob.selTypeClass).contains(tripClass).click()
})

// Select Airport (works for both directions)
Cypress.Commands.add('selectAirport', (originDestination:string, airport: string) =>{
    cy.get(originDestination).children().first().type(airport)
    cy.get(selSlob.selAirport).contains(airport).click()    
})

// Select date and search for flight
Cypress.Commands.add('searchFlight', () =>{
    cy.get(selSlob.selDay).click()
    cy.get(selSlob.selToday).click({force: true})
    cy.intercept('POST', 'https://book.airmalta.com/api/flightSearch/itineraryPart').as('flightSearch')
    cy.get(selSlob.selBtn).contains('Find flights').click()
    cy.wait('@flightSearch').its('response.statusCode').should('be.equal', 200)
})

// Get  flight info and print out
Cypress.Commands.add('getFlight', (orig: string, dest: string) =>{
    cy.get('button:contains("€")', {timeout: 6000}).should('be.visible').first().children()
    .contains('€').invoke('text')
    .then(text=>{ expect(text).contains('€')
                  cy.log(`Price for first available fligt 
                          from ${orig} to ${dest} 
                          is: ${text}`)
    })
})
