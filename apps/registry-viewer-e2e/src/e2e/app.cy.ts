/**
 * Copyright 2022 Red Hat, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

describe('Registry Viewer', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  context('mobile view', () => {
    beforeEach(() => {
      cy.viewport('iphone-5');
    });

    describe('Header', () => {
      it('has a clickable devfile icon', () => {
        cy.get('a[data-testid="header-devfile-icon"]').click();
      });

      it('displays the mobile navigation', () => {
        cy.get('button[data-testid="header-navigation-popover"]').should('be.visible');
      });

      context('open navigation popover', () => {
        beforeEach(() => {
          cy.get('button[data-testid="header-navigation-popover"]').click();
        });

        context('open version selector listbox', () => {
          const themes = ['light', 'dark', 'system'];
          const listboxLocation =
            'div[class*="justify-between"] > div > button[data-testid="theme-selector"]';
          beforeEach(() => {
            cy.get(listboxLocation).click();
          });

          themes.forEach((theme) => {
            it(`changes theme to ${theme}`, () => {
              cy.get(`li[data-testid="theme-selector-${theme}"]`).click();
              cy.get(`${listboxLocation} svg[data-testid="theme-selector-${theme}"]`).should(
                'have.length',
                theme === 'system' ? 2 : 1,
              );
            });
          });
        });

        it('has valid navigation links', () => {
          cy.get('a[data-testid^="header-navigation-"]').each(($a) => {
            const href = $a.attr('href') ?? 'undefined';
            cy.request(href).its('status').should('eq', 200);
          });
        });
      });
    });

    describe('Filter', () => {
      it('displays the mobile filter', () => {
        cy.get('button[data-testid="filter-popover"]').should('be.visible');
      });
    });
  });

  context('desktop view', () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
    });

    describe('Header', () => {
      it('has a clickable devfile icon', () => {
        cy.get('a[data-testid="header-devfile-icon"]').click();
      });

      it('does not display the mobile navigation', () => {
        cy.get('button[data-testid="header-navigation-popover"]').should('not.be.visible');
      });

      context('open version selector listbox', () => {
        const themes = ['light', 'dark', 'system'];
        const listboxLocation =
          'div[class*="justify-end"] > div > button[data-testid="theme-selector"]';
        beforeEach(() => {
          cy.get(listboxLocation).click();
        });

        themes.forEach((theme) => {
          it(`changes theme to ${theme}`, () => {
            cy.get(`li[data-testid="theme-selector-${theme}"]`).click();
            cy.get(`${listboxLocation} svg[data-testid="theme-selector-${theme}"]`).should(
              'have.length',
              theme === 'system' ? 2 : 1,
            );
          });
        });
      });

      it('has valid navigation links', () => {
        cy.get('a[data-testid^="header-navigation-"]').each(($a) => {
          const href = $a.attr('href') ?? 'undefined';
          cy.request(href).its('status').should('eq', 200);
        });
      });
    });

    describe('Filter', () => {
      it('does not display the mobile filter', () => {
        cy.get('button[data-testid="filter-popover"]').should('not.be.visible');
      });
    });
  });
});
