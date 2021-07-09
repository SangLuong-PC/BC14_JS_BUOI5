const TAX_LEVEL_1 = 60e6;
const TAX_LEVEL_2 = 120e6;
const TAX_LEVEL_3 = 210e6;
const TAX_LEVEL_4 = 384e6;
const TAX_LEVEL_5 = 624e6;
const TAX_LEVEL_6 = 960e6;

const TAX_PERCENTAGE_LEVEL_1 = 0.05;
const TAX_PERCENTAGE_LEVEL_2 = 0.1;
const TAX_PERCENTAGE_LEVEL_3 = 0.15;
const TAX_PERCENTAGE_LEVEL_4 = 0.2;
const TAX_PERCENTAGE_LEVEL_5 = 0.25;
const TAX_PERCENTAGE_LEVEL_6 = 0.3;
const TAX_PERCENTAGE_LEVEL_7 = 0.35;

function checkValidTax() {
  var result1 =
    checkEntry("fullName", "notifiName", 2, 0) &&
    checkName("fullName", "notifiName", 2, 6);

  var result2 =
    checkEntry("totalIncome", "notifiIncome", 2, 1) &&
    checkIsNumber("totalIncome", "notifiIncome", 2, 3) &&
    checkValueNumber("totalIncome", "notifiIncome", 2, 4);

  var result3 =
    checkEntry("dependents", "notifiDependent", 2, 2) &&
    checkIsNumber("dependents", "notifiDependent", 2, 3) &&
    checkValueNumber("dependents", "notifiDependent", 2, 5) &&
    checkInteger("dependents", "notifiDependent", 2, 7);

  return result1 && result2 && result3 ? true : false;
}

function calculateTaxableIncome() {
  const FREE = 4000000;
  const DEPENDENT_MONEY = 1600000;
  var totalIncome = +getEle("totalIncome").value;
  var dependents = +getEle("dependents").value;
  return totalIncome - FREE - dependents * DEPENDENT_MONEY;
}

function calculateTaxLevel1(taxableIncome) {
  return taxableIncome * TAX_PERCENTAGE_LEVEL_1;
}

function calculateTaxLevel2(taxableIncome) {
  var TaxLevel1 = calculateTaxLevel1(TAX_LEVEL_1);
  return (taxableIncome - TAX_LEVEL_1) * TAX_PERCENTAGE_LEVEL_2 + TaxLevel1;
}

function calculateTaxLevel3(taxableIncome) {
  var TaxLevel2 = calculateTaxLevel2(TAX_LEVEL_2);
  return (taxableIncome - TAX_LEVEL_2) * TAX_PERCENTAGE_LEVEL_3 + TaxLevel2;
}

function calculateTaxLevel4(taxableIncome) {
  var TaxLevel3 = calculateTaxLevel3(TAX_LEVEL_3);
  return (taxableIncome - TAX_LEVEL_3) * TAX_PERCENTAGE_LEVEL_4 + TaxLevel3;
}

function calculateTaxLevel5(taxableIncome) {
  var TaxLevel4 = calculateTaxLevel4(TAX_LEVEL_4);
  return (taxableIncome - TAX_LEVEL_4) * TAX_PERCENTAGE_LEVEL_5 + TaxLevel4;
}

function calculateTaxLevel6(taxableIncome) {
  var TaxLevel5 = calculateTaxLevel5(TAX_LEVEL_5);
  return (taxableIncome - TAX_LEVEL_5) * TAX_PERCENTAGE_LEVEL_6 + TaxLevel5;
}

function calculateTaxLevel7(taxableIncome) {
  var TaxLevel6 = calculateTaxLevel6(TAX_LEVEL_6);
  return (taxableIncome - TAX_LEVEL_6) * TAX_PERCENTAGE_LEVEL_7 + TaxLevel6;
}

function calculateTax() {
  var taxableIncome = calculateTaxableIncome();
  if (taxableIncome > TAX_LEVEL_6) {
    return calculateTaxLevel7(taxableIncome);
  }
  if (taxableIncome > TAX_LEVEL_5) {
    return calculateTaxLevel6(taxableIncome);
  }
  if (taxableIncome > TAX_LEVEL_4) {
    return calculateTaxLevel5(taxableIncome);
  }
  if (taxableIncome > TAX_LEVEL_3) {
    return calculateTaxLevel4(taxableIncome);
  }
  if (taxableIncome > TAX_LEVEL_2) {
    return calculateTaxLevel3(taxableIncome);
  }
  if (taxableIncome > TAX_LEVEL_1) {
    return calculateTaxLevel2(taxableIncome);
  }
  if (taxableIncome > 0) {
    return calculateTaxLevel1(taxableIncome);
  }
  return 0;
}

getEle("btnResult").addEventListener("click", function () {
  var check = checkValidTax();
  getEle("resultTax").innerHTML = "";
  if (check) {
    var taxMoney = calculateTax();
    if (taxMoney > 0) {
      getEle("resultTax").innerHTML =
        "Tiền thuế phải trả là: " + taxMoney.toFixed(2) + " VND";
    } else {
      getEle("resultTax").innerHTML = "Bạn không phải chịu thuế!";
    }
  }
});
