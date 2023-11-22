
import { loginToApplication } from "../commonUtilities/loginUtilities/loginPage";
import { clickAction, typeAction } from "../genericUtilities/genericUtils";
import * as tablePage from "../pageObjects/tablePage.json";
const {
  txtTableDataInput,
  btnRefreshTable,
  btnClick,
  tableColoumnName,
  tableColoumnAge,
  tableColoumnGender
} = tablePage;

describe('validating dynamic table data', () => {
  let testData;
  before(function () {
    cy.fixture('testData').then(function (data) {
      testData = data
    });
  });

  beforeEach(() => {
    loginToApplication();
  });

  it('validating the table data', () => {

    clickAction({ element: btnClick })
    cy.get(txtTableDataInput).clear()
    typeAction({ element: txtTableDataInput, inputData: JSON.stringify(testData.tableData) })
    clickAction({ element: btnRefreshTable })
    let coloumnName = [];
    cy.get(tableColoumnName).each((em) => {
      let text = em.text()
      coloumnName.push(text)
    })
    cy.then(() => {
      console.log('sam', coloumnName)
      testData.tableData.map((data, index) => {
        expect(data.name).equal(coloumnName[index])
      })
    })

    let coloumnAge = [];
    cy.get(tableColoumnAge).each((em) => {
      let text = em.text()
      coloumnAge.push(text)
    })
    cy.then(() => {
      console.log('sam', coloumnAge)
      testData.tableData.map((data, index) => {
        expect(data.age).equal(parseInt(coloumnAge[index]))
      })
    })

    let coloumnGender = [];
    cy.get(tableColoumnGender).each((em) => {
      let text = em.text()
      coloumnGender.push(text)
    })
    cy.then(() => {
      console.log('sam', coloumnGender)
      testData.tableData.map((data, index) => {
        expect(data.gender).equal(coloumnGender[index])
      })
    })
  });
});