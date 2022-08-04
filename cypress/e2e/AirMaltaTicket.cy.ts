///<reference types="cypress" />
import {originDestination} from "../support/supportingvar"

describe('AirMalta Airline', () => {
    beforeEach( ()=>{
        cy.openBaseUrl()
        //cy.visit('/')
    })

    it.only('Get First Available Flight', () => {
        cy.selectTripTypeandClass('One way', 'Economy')
        cy.selectAirport(originDestination.orig, 'VIE') 
        cy.selectAirport(originDestination.dest, 'MLA') 
        cy.searchFlight()
        cy.getFlight('VIE','MLA')
    })
    
    it('Get Busines class Flight', () => {
        cy.log('Get Busines class Flight');
    })
})
