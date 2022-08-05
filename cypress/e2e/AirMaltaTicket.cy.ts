///<reference types="cypress" />

import {OriginDestination} from "../support/types"

describe('AirMalta Ticket test suite', () => {
    beforeEach( ()=>{
        cy.openBaseUrl()
    })

    it('Get First Available Flight', () => {
        cy.selectTripTypeandClass('One way', 'Economy')
        cy.selectAirport(OriginDestination.orig, 'VIE') 
        cy.selectAirport(OriginDestination.dest, 'MLA') 
        cy.searchFlight()
        cy.getFlight('VIE','MLA')
    })

})
