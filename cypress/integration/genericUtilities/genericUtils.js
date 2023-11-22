export const clickAction = ({ element: locator }) => {
  cy.get(locator).click();
};

export const typeAction = ({ element: locator, inputData: data }) => {
  cy.get(locator).type(data,  { parseSpecialCharSequences: false });
};