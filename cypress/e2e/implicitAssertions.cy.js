/// <reference types="cypress"/>  
//зверху - щоб було видно випадайку з підказками
//неявні перевірки
it('Implicit assertions', () => {
   
  cy.visit('http://localhost:8080/commands/assertions');
//чи є у рядка потрібний клас .should('have.class', назва класу 'success'
//для вибору елементу по порядку .eq(3), де 3 - номер по порядку починаючи з 0
  cy.get('.assertion-table tr').eq(3).should('have.class', 'success');
//перевірити наявність атрибутів .should('have.attr' з назвою class
  cy.get('.assertion-table tr').eq(3).should('have.attr', 'class');
//перевірити наявність атрибутів .should('have.attr' з назвою scope на рівень нижче
  cy.get('.assertion-table tr th').eq(3).should('have.attr', 'scope');

  //перевірки наявності ТЕКСТУ всередині елемента, чутливе до регістра

  cy.get('.assertion-table tr td').eq(3).should('have.text', 'Column content'); //перевіряє текст навіть в пропертіс, не тільки як валує
  cy.get('.assertion-table tr td').eq(3).should('contain', 'Column content');
  cy.get('.assertion-table tr td').eq(3).should('have.html', 'Column content');
// перевірка по частковому пошуку тексту include
  cy.get('.assertion-table tr td').eq(3).should('include.text', ' content'); 
  //впевнитись, що немає тексту на сторінці, зворотня перевірка not.contain
  cy.get('.assertion-table tr td').eq(3).should('not.contain', 'rgederer'); 
//перевірка наявності числа, 
  cy.get('.assertion-table tr th').eq(5).should('contain', '3'); 
  //перевірити логіку, чи наприклад число більше чогось
  //команда invoke дістає всі характеристики елемента, властивості (у табі Computed - справа в Девтулс - все це можна скласти в invoke )
  //.then(parseFloat) - потім перетворити його на число
  //.should('be.greaterThan', 2) - має бути більше за 2
  cy.get('.assertion-table tr th').eq(5).invoke('text').then(parseFloat).should('be.greaterThan', 2); 

  cy.visit('http://localhost:8080/commands/querying')
//перевіє введені дані в поле для вводу 'have.value' - можна введений текст перевірити в табі Properties справа в девтулс
  cy.get('#inputName').type('erwer').should('have.value', 'erwer');
  
  cy.visit('http://localhost:8080/commands/traversal')
//чекнути, що елемент задізейблений, неклікабельний be.disabled
  cy.get('.traversal-disabled .btn').eq(0).should('be.disabled');
//перевірити чи впринципі цей елемент є на сторінці exist
  cy.get('.traversal-disabled .btn').eq(0).should('exist');
  //має бути на сторінці і має бути задізейблений
  cy.get('.traversal-disabled .btn').eq(0).should('exist').and('be.disabled');
  //має бути на сторінці exist і має бути НЕзадізейблений be.enabled
  cy.get('.traversal-disabled .btn').eq(1).should('exist').and('be.enabled');

  cy.visit('http://localhost:8080/commands/assertions');
//перевірити колір в Computed або Properties табі .should('have.css' стиль 'background-color' і має дорівнювати 'eq' колір 'rgb(223, 240, 216)'
  cy.get('.assertion-table tr td').eq(4)
  .should('have.css', 'background-color')
  .and('eq', 'rgb(223, 240, 216)');
//знайти текст на сторінці і він має бути видимий 'be.visible' - псевдоселектор 'h3:
  cy.get('h3:contains("Implicit Assertions")').should('be.visible');

})


