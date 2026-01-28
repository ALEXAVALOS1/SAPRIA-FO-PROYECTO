describe('Satisfaction Survey Workflow', () => {
  beforeEach(() => {
    // Visit the app using the baseUrl configured in cypress.config.ts
    cy.visit('/');
    
    // The critical alert modal is open by default and blocks interaction with the survey button.
    // We must close it first.
    cy.contains('button', 'Cerrar').click();
    cy.contains('¡ALERTA CRÍTICA DETECTADA!').should('not.exist');
  });

  it('should open the survey modal when clicking the side button', () => {
    cy.contains('button', 'Encuesta de Satisfacción').click();
    cy.contains('h3', 'Encuesta de Satisfacción').should('be.visible');
    cy.contains('¿Qué tan útil te pareció la información?').should('be.visible');
  });

  it('should allow rating, commenting, and submitting the survey', () => {
    // Open modal
    cy.contains('button', 'Encuesta de Satisfacción').click();

    // Check submit is disabled initially
    cy.contains('button', 'Enviar Comentarios').should('be.disabled');

    // Select 5 stars using the aria-label
    cy.get('button[aria-label="Calificar con 5 estrellas"]').click();
    
    // Check submit is enabled
    cy.contains('button', 'Enviar Comentarios').should('not.be.disabled');

    // Add a comment
    cy.get('textarea').type('Excelente sistema de monitoreo, muy intuitivo.');

    // Submit the form
    cy.contains('button', 'Enviar Comentarios').click();

    // Verify success message
    cy.contains('¡Gracias por tu opinión!').should('be.visible');
    cy.contains('Tus comentarios nos ayudan a mejorar.').should('be.visible');

    // Verify modal closes automatically after delay
    // The component has a 2000ms delay, we wait slightly longer
    cy.wait(2500);
    cy.contains('h3', 'Encuesta de Satisfacción').should('not.exist');
  });
});