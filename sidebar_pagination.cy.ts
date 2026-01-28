describe('Funcionalidad de Bitácora y Paginación (Sidebar Derecho)', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');

    // --- FASE 1: Autenticación (Requisito previo) ---
    cy.get('#username').type('admin@example.com');
    cy.get('#password').type('Admin123$');
    cy.get('button[type="submit"]').click();

    // Cerrar modal de alerta inicial si aparece para despejar la UI
    cy.get('body').then(($body) => {
      if ($body.find('[role="dialog"]').length > 0) {
        cy.contains('button', 'Cerrar').click();
      }
    });

    // Verificación de que el Sidebar Derecho está presente
    // Buscamos el input de búsqueda característico de este componente
    cy.get('input[placeholder="Buscar en bitácora..."]').should('exist');
  });

  it('Debe navegar correctamente entre las páginas de la bitácora', () => {
    // 1. Verificar estado inicial (Página 1)
    cy.contains(/Página 1 de \d+/).should('be.visible');
    cy.get('button[aria-label="Página anterior"]').should('be.disabled');
    cy.get('button[aria-label="Página siguiente"]').should('be.enabled');

    // 2. Navegar a la siguiente página
    cy.get('button[aria-label="Página siguiente"]').click();
    
    // Verificar cambio de página
    cy.contains(/Página 2 de \d+/).should('be.visible');
    cy.get('button[aria-label="Página anterior"]').should('be.enabled');

    // 3. Regresar a la página anterior
    cy.get('button[aria-label="Página anterior"]').click();
    
    // Verificar regreso a página 1
    cy.contains(/Página 1 de \d+/).should('be.visible');
    cy.get('button[aria-label="Página anterior"]').should('be.disabled');
  });

  it('Debe reiniciar la paginación a la página 1 al realizar una búsqueda', () => {
    // 1. Avanzar a la página 2 intencionalmente
    cy.get('button[aria-label="Página siguiente"]').click();
    cy.contains(/Página 2 de \d+/).should('be.visible');

    // 2. Realizar una búsqueda (Filtrado)
    // Escribimos "Riberas" que sabemos que existe en los datos mock
    cy.get('input[placeholder="Buscar en bitácora..."]').type('Riberas');

    // 3. Verificar que la paginación se reinició automáticamente
    // El componente debe detectar el cambio en los datos filtrados y volver a la pág 1
    cy.contains(/Página 1 de \d+/).should('be.visible');
    
    // Verificar que el botón "Anterior" se deshabilita nuevamente
    cy.get('button[aria-label="Página anterior"]').should('be.disabled');
  });
});