// / <reference types="cypress" />

import * as commonCommands from './commands/common';
import * as profileCommands from './commands/profile';
import * as articleCommands from './commands/article';
import * as commentsCommands from './commands/comment';
import * as ratingCommands from './commands/rating';

Cypress.Commands.addAll(commonCommands);
Cypress.Commands.addAll(profileCommands);
Cypress.Commands.addAll(articleCommands);
Cypress.Commands.addAll(commentsCommands);
Cypress.Commands.addAll(ratingCommands);

// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
