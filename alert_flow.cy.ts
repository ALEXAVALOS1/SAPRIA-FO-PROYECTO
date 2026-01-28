describe('Flujo de Alertas y Respuesta de Emergencia', () => {
  beforeEach(() => {
    // Asegúrate de que tu aplicación esté corriendo en este puerto
    cy.visit('http://localhost:3000');
  });

  it('Debe realizar el flujo completo: Login -> Alerta Inicial -> Reactivación -> Interacción', () => {
    // --- FASE 1: Autenticación ---
    // Verificar que estamos en la pantalla de login
    cy.contains('SINAPRIA-FO').should('be.visible');
    cy.contains('Acceso al Sistema').should('be.visible');

    // Intentar login con credenciales incorrectas
    cy.get('#username').type('usuario@error.com');
    cy.get('#password').type('Error123$'); // Cumple formato pero es incorrecta
    cy.get('button[type="submit"]').click();
    
    // Verificar mensaje de error
    cy.contains('Credenciales inválidas').should('be.visible');

    // Login exitoso como Admin
    cy.get('#username').clear().type('admin@example.com');
    cy.get('#password').clear().type('Admin123$');
    cy.get('button[type="submit"]').click();

    // --- FASE 2: Alerta Inicial (Post-Login) ---
    // Al loguearse, el modal de alerta debe aparecer automáticamente
    cy.get('[role="dialog"]').should('be.visible');
    cy.get('#modal-title').should('contain', '¡ALERTA CRÍTICA DETECTADA!');
    
    // Verificar contenido crítico
    cy.contains('Riberas Del Bravo').should('be.visible');
    cy.contains('Evite realizar quemas').should('be.visible');

    // Cerrar la alerta inicial
    cy.contains('button', 'Cerrar').click();
    cy.get('[role="dialog"]').should('not.exist');

    // --- FASE 3: Navegación y Reactivación ---
    // Verificar que estamos en el dashboard principal
    cy.get('header').contains('SINAPRIA-FO').should('be.visible');
    
    // Localizar el Sidebar Izquierdo y la sección de Alerta Crítica
    cy.get('aside[aria-label="Controles del Mapa y Alertas"]').within(() => {
      cy.contains('Alerta Crítica').should('be.visible');
      cy.contains('3 nuevos focos').should('be.visible');
      
      // Reactivar la alerta haciendo clic en "Ver detalles"
      cy.contains('button', 'Ver detalles').click();
    });

    // --- FASE 4: Interacción con el Modal ---
    // Verificar que el modal regresó
    cy.get('[role="dialog"]').should('be.visible');

    // Stub para el portapapeles (necesario ya que los navegadores headless bloquean clipboard)
    cy.window().then((win) => {
      // Simulamos la API de clipboard
      if (!win.navigator.clipboard) {
        (win.navigator as any).clipboard = {};
      }
      cy.stub(win.navigator.clipboard, 'writeText').resolves();
    });

    // Probar botón de copiar enlace
    cy.contains('button', 'Enlace').click();
    cy.contains('Copiado').should('be.visible');

    // Probar botón de "Ver Mapa de Riesgo" (que también cierra el modal)
    cy.contains('button', 'Ver Mapa de Riesgo').click();
    cy.get('[role="dialog"]').should('not.exist');
  });
});