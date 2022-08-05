/// <reference types="cypress" />

import {Selectors} from "../support/selectors"

const SelSlob = new Selectors();

Cypress.Commands.add( "openBaseUrl", ()=>{ 
    cy.visit('/') 
    cy.on('uncaught:exception', (err, runnable) => {
        return false
    })    
    cy.url().should('contains', 'airmalta.com')
    cy.get(SelSlob.acepCookie).click()
})

// Select trip type and class 
Cypress.Commands.add('selectTripTypeandClass', (tripType:string, tripClass:string) =>{
    cy.get(SelSlob.ddmTypeClass).eq(0).type(tripType)
    cy.get(SelSlob.selTypeClass).contains(tripType).click()
    cy.get(SelSlob.ddmTypeClass).eq(1).type(tripClass)
    cy.get(SelSlob.selTypeClass).contains(tripClass).click()
})

// Select Airport (works for both directions)
Cypress.Commands.add('selectAirport', (originDestination:string, airport: string) =>{
    cy.get(originDestination).children().first().type(airport)
    cy.get(SelSlob.selAirport).contains(airport).click()    
})

// Select date and search for flight
Cypress.Commands.add('searchFlight', () =>{
    cy.get(SelSlob.selDay).click()
    cy.get(SelSlob.selToday).click({force: true})
    cy.intercept('POST', 'https://book.airmalta.com/api/flightSearch/itineraryPart').as('flightSearch')
    cy.get(SelSlob.selBtn).contains('Find flights').click()
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
