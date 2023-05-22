//для перевірки того, що знаходиться в URL
//тести, перевірити чи на правильні ендпоінти ведуть посилання

/// <reference types="cypress"/>  

it('Explicit assertions', () => {
    cy.visit('http://localhost:8080/commands/assertions');
//перевіряє локацію URL
    cy.location().then ( location => {
        expect(location.hash).to.be.empty;
        expect(location.href).to.be.eq('http://localhost:8080/commands/assertions');
        expect(location.host).to.be.eq('localhost:8080'); //чи на правильний ендпоінт веде нас АПІ
        expect(location.hostname).to.be.eq('localhost');
        expect(location.origin).to.be.eq('http://localhost:8080');
        expect(location.pathname).to.be.eq('/commands/assertions');
        expect(location.port).to.be.eq('8080');
        expect(location.protocol).to.be.eq('http:');
        expect(location.search).to.be.eq(''); // перевіряє Query параметри
    }) 

    cy.url().should('eq', 'http://localhost:8080/commands/assertions');    
})