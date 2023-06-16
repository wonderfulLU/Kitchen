/// <reference types="cypress"/> 

//Queries в документації до Cypress--команди, що допомагають в локалізації елемента

//в одному терміналі npm run start
//в іншому терміналі npx cypress open

it('Cypress commands for quering elements', () => {
  cy.visit('http://localhost:8080/commands/querying');

  //cy.wait(5000); бажано не використовувати --заданий конкресний проміжок часу,зупиняє повністю виконання тесту і чекає
  //cy.get('#query-btn').should('contain', 'Button');
  //далі для випадків коли нестабільний енвайронмент і сторінка довго завантажується
  cy.get('#query-btn', {timeout: 10000}).should('contain', 'Button');//краще так -- чекає стільки часу, поки не знайде елемент з певним локатором, поки не завантажиться сторінка

  cy.get('.query-list').contains('bananas').should('have.class', 'third'); //.get().contains()
  //.contains для пошуку за текстом (контентом), селектором
  cy.contains('bananas').should('have.class', 'third');//cy.contains('some text')
  cy.contains('li', 'bananas').should('have.class', 'third'); //cy.contains('locator', 'some text')
  cy.contains(/^b\w+/).should('have.class', 'third'); //cy.contains(Regex)
  //.within - відсікає непотрібну для перевірки частину сторінки
  cy.get('.query-form').within(() => {  //після локалізації ніби іншої частини сторінки не існує
    cy.get('#inputEmail').should('have.attr', 'placeholder', 'Email');
    cy.get('#inputPassword').should('have.attr', 'placeholder', 'Password');

    //cy.get('#inputName').should('have.attr', 'placeholder', 'Name'); //--недоступне - -спроба дістіти після команди .within

    //знаходить корневий елемент сторінки
    //cy.root();-використовується коли робиться довгий ланцюжок і можна повернутися на початок сторінки
  }) 

cy.root().should('contain', 'Button');

//.children діставання дочірніх елементів з батьківського
cy.visit('http://localhost:8080/commands/traversal');  //#query-btn
cy.get('.traversal-breadcrumb.breadcrumb').children('li').eq(0).should('contain', 'Home');
cy.get('.traversal-breadcrumb.breadcrumb').children('.active').should('contain', 'Data');

//.closest ---найближчий елемент з селектором, який передається
cy.get('.badge.traversal-badge').closest('ul').should('have.class', 'list-group');

cy.contains('John')
.should('contain', 'John')
.closest('table')
.should('contain', '#');

//.filter - фільтрує елементи за селектором, дістає потрібний елемент зі списку інших аналогічних
cy.get('.traversal-nav.nav.nav-tabs').find('li').filter('.active');
cy.get('.traversal-nav.nav.nav-tabs li.active')

//.find ---дістає дочірні едементи з ДОМ структури за селектором
cy.get('.pagination.traversal-pagination').find('span'); 

//.first --- вибирає перший елемент зачейнений після cy.get
cy.get('.table.traversal-table th').first().should('contain', '#');
cy.get('.table.traversal-table th').eq(0).should('contain', '#');

//.last --- вибирає останній елемент зачейнений після cy.get
cy.get('.table.traversal-table th').last().should('contain', 'Last Name');

//.next - -бере наступний сусідній братерський елемент
cy.get('.traversal-ul')
.contains('apples')
.should('contain', 'apples')
.next()
.should('contain', 'oranges')
.next()
.should('contain', 'bananas');

cy.get('.table.traversal-table td')
.first()
.should('contain', '1')
.next()
.should('contain', 'Jane')
.next()
.should('contain', 'Lane');

//.nextAll знаходить всі елементи, які знаходяться на одному рівні
//дістанемо в порахуємо ('have.length', 3)

cy.get('.traversal-next-all')
.contains('oranges')
.nextAll()
.should('have.length', 3)

//.nextUntil-- порахувати всі елементи починаюси від #fruits до #veggies
cy.get('#fruits') //порахувати проміжні сусідні ДОМ елементи - треба вказати діапазон
.nextUntil('#veggies')
.should('have.length', 3)

//.not
cy.get('.traversal-disabled .btn.btn-default') //!!! часто використовувана
.not('[disabled]')
.should('contain', 'Button')

cy.get('.traversal-disabled .btn.btn-default:not("[disabled]")').not('.fake') //!!!те саме що вище

cy.get('.traversal-disabled .btn.btn-default:not("[disabled]")').should('be.enabled');

cy.get('.traversal-mark') //!!! дуже часто -.parent - бере батьківський елемент
.should('contain', 'highlight')
.parent()
.should('contain', 'Morbi leo risus, porta ac consectetur ac, ')
.parent()
.should('have.class', 'well')

//.parents ---бере усі батьківські елементи
cy.get('.traversal-cite')  
.should('contain', 'Source Title')
.parents()
.should('match', 'blockquote')

})