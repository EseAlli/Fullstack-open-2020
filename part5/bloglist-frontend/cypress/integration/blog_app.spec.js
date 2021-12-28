describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = {
        username: 'EseAlli',
        name: 'Ese',
        password: 'password@123'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
        cy.contains("username")
    })

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.contains('login').click()
            cy.get('input:first').type('EseAlli')
            cy.get('input:last').type('password@123')
            cy.get('#login-button').click()

            cy.contains('create new blog')
        })
    
        it('fails with wrong credentials', function() {
            cy.contains('login').click()
            cy.get('input:first').type('EseAlli')
            cy.get('input:last').type('pasrd@123')
            cy.get('#login-button').click()

            cy.get('.error')
            .should('contain', 'Wrong credentials')
            .and('have.css', 'color', 'rgb(255, 0, 0)')
            .and('have.css', 'border-style', 'solid')
        })
      })

      describe('When logged in', function() {
        beforeEach(function () {
            cy.request('POST', 'http://localhost:3003/api/login', {
              username: 'EseAlli',
              password: 'password@123',
            }).then((response) => {
              localStorage.setItem('blogUser', JSON.stringify(response.body))
              cy.visit('http://localhost:3000')
            })
        })

        it('A blog can be created', function() {
            cy.contains('create new blog').click()
            cy.get('#title').type('a blog created by cypress')
            cy.get('#author').type('Ese Alli')
            cy.get('#url').type('https://cyrpess-example.com')
            cy.get('#create').click()

            cy.get('.success')
            .should('contain', 'a blog created by cypress by Ese Alli')
            .and('have.css', 'color', 'rgb(0, 128, 0)')
            .and('have.css', 'border-style', 'solid')

            cy.contains('a blog created by cypress')
        })

        describe('When a blog exists', function(){
            beforeEach(function (){
                cy.createBlog({ title: "Test", author: "Test Author", url: "https;//cypress-test.com"})
            })

            it ('A blog can be liked', function (){
                cy.get('#blog-view').click()
                cy.get('#like').click()
                cy.contains("1 like")
            })

            it('the user who created the blog can delete it', function () {
                cy.contains('show').click()
                cy.contains('remove').click()
                cy.on('windows:confirm', () => true)

                cy.visit('http://localhost:3000')
              })
        
        })

        describe('the blog with most likes above', function () {
            beforeEach(function () {
              cy.createBlog({
                title: 'Blog 1',
                author: 'Ese',
                url: 'https://blog.com',
                likes: '10'
              })
              cy.createBlog({
                title: 'Blog 2',
                author: 'Ese',
                url: 'https://blog.com',
                likes: '12'
              })
            })
      
            it('one of those with most likes is above', async function () {
      
              cy.contains('Blog 1')
                .parent()
                .find('button')
                .click()
      
              cy.contains('Blog 2 ')
                .parent()
                .find('button')
                .click()
      
              cy.get('.blog:first').contains('12 like')
            })
    
          })

      })
  })