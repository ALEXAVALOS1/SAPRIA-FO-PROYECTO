describe('Critical Alert Workflow', () => {
  beforeEach(() => {
    // Assumes the application is running on localhost:3000
    // You can configure baseUrl in cypress.config.ts to use cy.visit('/')
    cy.visit('http://localhost:3000');
  });

  it('should display the critical alert modal on initial load', () => {
    // Verify modal visibility and content
    cy.contains('¡ALERTA CRÍTICA DETECTADA!').should('be.visible');
    cy.contains('Riberas Del Bravo').should('be.visible');
    
    // Verify action buttons exist
    cy.contains('button', 'Cerrar').should('be.visible');
    cy.contains('button', 'Ver Mapa de Riesgo').should('be.visible');
  });

  it('should allow closing the modal and reopening it from the sidebar', () => {
    // 1. Close the modal
    cy.contains('button', 'Cerrar').click();
    cy.contains('¡ALERTA CRÍTICA DETECTADA!').should('not.exist');

    // 2. Find the trigger in the sidebar and click it
    // Targeting the "Ver detalles" button in the sidebar
    cy.contains('button', 'Ver detalles').click();

    // 3. Verify modal reappears
    cy.contains('¡ALERTA CRÍTICA DETECTADA!').should('be.visible');
  });

  it('should show a toast message when copying the link', () => {
    // Click the "Enlace" button
    cy.contains('button', 'Enlace').click();

    // Verify the "Copiado" toast message appears
    cy.contains('Copiado').should('be.visible');

    // Verify it disappears after 2 seconds (wait slightly longer to be safe)
    cy.wait(2100);
    cy.contains('Copiado').should('not.exist');
  });

  it('should close the modal when clicking "Ver Mapa de Riesgo"', () => {
    cy.contains('button', 'Ver Mapa de Riesgo').click();
    // Should close the modal to reveal the map
    cy.contains('¡ALERTA CRÍTICA DETECTADA!').should('not.exist');
  });
});