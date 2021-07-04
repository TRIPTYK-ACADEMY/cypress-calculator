describe('make calculations test', () => {
    it('Make calculations +', () => {
        cy.visit('/')
        cy.findByTestId('1').click();
        cy.findByTestId('+').click();
        cy.findByTestId('3').click();
        cy.findByTestId('=').click();
        cy.findByTestId('display').should('have.text', '5')
            // .get('.w-64 > :nth-child(2) > :nth-child(1)')
            // .click()
            // .get(':nth-child(2) > .calculator-secondary-btn')
            // .click()
            // .get(':nth-child(2) > :nth-child(3)')
            // .click()
            // .get(':nth-child(6) > :nth-child(4)')
            // .click()
            // .get('.w-full')
            // 
    })
    it('recorder scenario', () => {
        cy.visit('/');
        cy.get('.flex:nth-child(3) > .calculator-primary-btn:nth-child(1)').click();
        cy.get('.flex:nth-child(3) > .calculator-primary-btn:nth-child(2)').click();
        cy.get('.flex:nth-child(3) .w-10').click();
        cy.get('.flex:nth-child(3) > .calculator-primary-btn:nth-child(3)').click();
        cy.get('.calculator-primary-btn:nth-child(4)').click();

    })
})