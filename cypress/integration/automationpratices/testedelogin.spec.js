describe('Teste de login', () => {
    
    context('Com um email e senha válidos:', () => {
       
        it('Deve logar com sucesso', () => {
        
        cy.visit('http://automationpractice.com/index.php?controller=authentication');
        cy.get('#email').type('cypress2022@gmail.com');
        cy.get('#passwd').type('cypress2022');
        cy.get('div [id*=Login]').click()
        cy.get('.info-account')
            .should(($p) => {
            expect($p.first()).to.contain('Welcome to your account')
            })
        });

    });

        
    context('Com o email preechido e a senha vazia:', function () {

        it('O sistema deve apresentar por alerta de erro', () => {
            
            cy.visit('http://automationpractice.com/index.php?controller=authentication');
            cy.get('#email').type('cypress2022@gmail.com');
            cy.get('div [id*=Login]').click()
            cy.get('.alert-danger li')
            .should(($p) => {
                expect($p.first()).to.contain('Password is required.')
            })
        
        });

    })
    
    context('Com o email e senha incorretos:', () => {
        
        it('Deverá apresentar falha na autenticação', () => {
           
            cy.visit('http://automationpractice.com/index.php?controller=authentication');          
            cy.get('#email').type('emailerrado@gmail.com');
            cy.get('#passwd').type('senhaerrada');
            cy.get('div [id*=Login]').click()
            cy.get('.alert-danger li')
                .should('have.text', 'Authentication failed.')
    
    
    
        });

    });
    
    context('Com o email correto e senha incorretos:', () => {
        
        it('Deverá apresentar falha na autenticação', () => {
           
            cy.visit('http://automationpractice.com/index.php?controller=authentication');          
            cy.get('#email').type('emailerrado@gmail.com');
            cy.get('#passwd').type('senha3errada');
            cy.get('div [id*=Login]').click()
            cy.get('.alert-danger li')
                .should('have.text', 'Authentication failed.')
    
    
    
        });

    });

    context('Quando email é ruim:', function() {

        const emails = [

            'emailinvalidogmail.com',
            'emailinvalido2gmail.com',
            'email$gmail.com',
            'emailinvalido@gmail',

        ]

        emails.forEach(function (email) {
            it('Deverá retornar a mensagem de endereço de email inválido para o email: '+ email, function() {
                cy.visit('http://automationpractice.com/index.php?controller=authentication');          
                cy.get('#email').type(email);
                cy.get('#passwd').type('senhaerrada');
                cy.get('div [id*=Login]').click()
                cy.get('.alert-danger li')
                    .should('have.text', 'Invalid email address.')
    
            })

        })

        

    })
    
    context('Com o email e senha vazios :', () => {
        
        it('Deverá retornar que o email é necessário', () => {
           
            cy.visit('http://automationpractice.com/index.php?controller=authentication');          
            cy.get('div [id*=Login]').click()
            cy.get('.alert-danger li')
                .should('have.text', 'An email address required.')
    
    
    
        });

    }); 


});

    