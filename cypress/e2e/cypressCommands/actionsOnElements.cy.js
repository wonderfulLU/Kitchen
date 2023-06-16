/// <reference types="cypress"/> 

//команди, які виконують певні дії над елементами

///програма для пошуку процесу, яка зайняла порт lsof -i tcp:8080 
//kill[пробіл][номер поруч з node і екскріпшинах]
//потрібний файл server.js для безпроблемної роботи

it('Cypress commands for performing actions elements', () => {
    cy.visit('http://localhost:8080/commands/actions');

//.type    
    cy.get('#email1').type('mail@mail.com');
//імітування натискання клавіш
//{delay: 50} - --опція затримки друку
    cy.get('#email1').clear().type('S{leftArrow}E{leftArrow}T{rightArrow}{rightArrow}{rightArrow}T', {delay: 50});//пересуваючи курсор написали слово "тест" в зворотньому порядку
    cy.get('textarea[disabled]').type('S{leftArrow}E{leftArrow}T{rightArrow}{rightArrow}{rightArrow}T', {delay: 50, force: true});// {force: true} опція примусово виконує дію і відміняє очікування поки елемент буде активний---бажано використовувати тільки тоді елемент на сторінці може бути перекритий іншим елементом, ігнорує всі обмеження, які є

    cy.get('#password1').focus().prev().should('have.attr', 'style').and('eq', 'color: orange;'); //HW!!!!!!!!!!!!!!!

    //.blur - протилежна до .focus
    cy.get('#fullName1').click().blur().prev().should('have.css', 'color').and('eq', 'rgb(255, 0, 0)');

    //.submit  - - -працює тільки з <form>
    cy.get('.action-form')
    .should('not.contain', 'Your form has been submitted!')
    .find('#couponCode1')
    .type('qwre qwe')
    .closest('form')
    .submit()
    .siblings() //сусідні елементи для форми
    .should('contain', 'Your form has been submitted!');

    //.click
    cy.get('#action-canvas').click(); //завжди посередині елемента
    cy.get('#action-canvas').click('topLeft'); 
    cy.get('#action-canvas').click('topRight');
    cy.get('#action-canvas').click('left');
    cy.get('#action-canvas').click('right');
    cy.get('#action-canvas').click('bottom');

    //клікаємо по координатам в пікселях
    cy.get('#action-canvas').click(10, 10);
    cy.get('#action-canvas').click(10, 100);

    //.check - - перевірка
    cy.get('.action-checkboxes [type="checkbox"]')
    .not('[disabled]')
    .check()
    .should('be.checked');

    //всередину .check можна передати що саме хочемо чекнути(за value має містити атрибут value="radio3")
    //ТІЛЬКИ для ЧЕК-БОКСІВ або РАДІО-БАТТОН
    cy.get('input[type="radio"]').check('radio3', {force: true});
    cy.get('input[type="radio"]').check('radio2');

    //знадобиться в домашці, там де ДРОП-ДАУН (value="fr-apples")
    cy.get('.action-select').select('fr-apples');
    cy.get('.action-select').select('oranges');

    //.scrollIntoView --скролить до потрібного елемента
    cy.get('#scroll-horizontal .btn.btn-danger')
    .should('not.be.visible')
    .scrollIntoView()
    .should('be.visible');

    cy.get('#scroll-vertical .btn.btn-danger')
    .should('not.be.visible')
    .scrollIntoView()
    .should('be.visible');

    //.trigger - - - запукає всі event-listeners які можна побачити в dev-tools справа
    cy.get('.trigger-input-range')
    .invoke('val', 99)
    .trigger('change')
    .siblings()
    .should('contain', '99');

})