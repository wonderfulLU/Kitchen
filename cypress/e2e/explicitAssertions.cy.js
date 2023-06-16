/// <reference types="cypress"/> 

//явні перевірки - вказується з чим має порівнюватись, перевірятись
//явно вказуємо сутність і з чим її порівнювати
//треба дістати з елемента властивість і вказати чому має дорівнювати значення
//не змінюють об'єкт перевірки
it.skip('Explicit assertions', () => {
       cy.visit('http://localhost:8080/commands/assertions');
//перевірити чи текст ідентичний до якогось тексту
       expect('text').to.eq('text')  
       //всередину не можна передати
       //expect(cy.get('.assertion-table tr').eq(3)).to.have.class('success'));//not working
       cy.get('.assertion-table tr').eq(3).then( element => {
        //щоб можна було виконувати дії з element
        //щоб всередині then можна було працювати з командами cypress
        //cy.wrap(element).click();
        expect(element).to.have.class('success');
        //перевірити атрибут
        expect(element).to.have.attr('class');
        //перевірити текст
//декілька способів порівняти дані
//усі eq працюють однаково з текстом
        expect(element.attr('class')).to.eq('success');// 2 =='2' нестроге порівняння - дані приводяться до одного типу
        expect(element.attr('class')).to.eql('success');// 2 ==='2' строге порівняння - дані НЕ приводяться до одного типу
        expect(element.attr('class')).to.eqls('success');// 2 ==='2' строге порівняння - дані НЕ приводяться до одного типу
        expect(element.attr('class')).to.equal('success');// 2 =='2' нестроге порівняння - дані приводяться до одного типу
        expect(element.attr('class')).to.equals('success');// 2 =='2' нестроге порівняння - дані приводяться до одного типу
    })

        const obj = {
            key: 'Anastasiia',
            keyObj: {
                key2: '1'
            }
        }

        const obj2 = {
            key: 'Anastasiia',
            keyObj: {
                key2: '1'
            }
        }

        //порівняти об'єкти obj & obj2
        expect(obj).to.eql(obj2) //порівнюють ніби як текст
        expect(obj).to.eqls(obj2) //порівнюють ніби як текст
        //expect(obj).to.eq(obj2)       //failed--порівнюють не просто ключі і значення і структуру, а й порівнюють ПОХОДЖЕННЯ - однакові об'єкти, але різні змінні
        //expect(obj).to.equal(obj2)    //failed
        //expect(obj).to.equals(obj2)   //failed

        // не фейлиться, коли копіюється, присвоюється об'єкт до об'єкта, коли вони прирівнюються
        const obj3 = obj;
        expect(obj).to.eql(obj3)      // non failed
        expect(obj).to.eqls(obj3)     // non failed
        expect(obj).to.eq(obj3)       // non failed
        expect(obj).to.equal(obj3)    // non failed
        expect(obj).to.equals(obj3)   // non failed
    })


it('Explicit assertions1', () => {
    cy.visit('http://localhost:8080/commands/assertions');

    cy.get('.assertion-table td').eq(3).then( tableCell => { //веб елемент, який знайшла команда перед then і називаємо його наприклад tableCell //використання jQuery в Cypress
     //console.log(tableCell)
     //перевірки наявності тексту
     expect(tableCell).to.have.text('Column content');
     expect(tableCell).to.contain('Column content');
     expect(tableCell).to.contain(' content'); //пошук по частині тексту
     expect(tableCell).to.have.html('Column content');

     expect(tableCell.text()).to.include('Column content'); //щоб правцював, треба дістати .text
     expect(tableCell.text()).to.include(' content');

     //заперечення .to.not.contain
     expect(tableCell).to.not.contain('hjsdfhdfg');
    })

    //порівняння чисел, чи 3 більше ніж 2
    cy.get('.assertion-table tr th').eq(5).then ( tableCell => {
        expect(tableCell).to.contain('3');
        expect(parseFloat(tableCell.text())).to.be.greaterThan(2); //parseFloat - перетворити на число
    })

    cy.visit('http://localhost:8080/commands/querying')

    cy.get('#inputName').type('erwer').then( inputField => {
        expect(inputField).to.have.value('erwer');
    })
        
    cy.visit('http://localhost:8080/commands/traversal')
    //чекнути, що елемент задізейблений, неклікабельний be.disabled
      cy.get('.traversal-disabled .btn').eq(0).then( disabledButton => {
        expect(disabledButton).to.be.disabled;
        expect(disabledButton).to.exist;
    });
})

//expect потрібен тоді, коли над одним і тим самим елементом треба виконати деклька перевірок підряд
