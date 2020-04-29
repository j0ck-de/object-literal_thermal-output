/*
 * OBJECT LITERALS
 */
const thermalOutputCalculator = {

  config: {
    inputValues: {
      heatFlow: 60,
      heatReturn: 55,
      heatTemperature: 20,
      heatExponent: 1.337,
      heatValue: 2800
    }
  },
  // default values is are the norm temperature values after DIN EN442.
  NORM_VALUES: {
    heatFlow: 75,
    heatReturn: 65,
    heatTemperature: 20
  },

  USER_VALUES: {},

  init: function () {
    this.setDefaultInputValues();
    this.setEventHandler();
  },
  // Helper function to get live dom nodes
  getDOM: function (node) {
    return document.getElementById(node);
  },

  getNewCalculatedThermalOutput: function () {
    this.USER_VALUES.heatFlow = +this.getDOM("heatFlow").value;
    this.USER_VALUES.heatReturn = +this.getDOM("heatReturn").value;
    this.USER_VALUES.heatTemperature = +this.getDOM("heatTemperature").value;
    this.USER_VALUES.heatValue = +this.getDOM("heatValue").value;
    this.USER_VALUES.heatExponent = +this.getDOM("heatExponent").value;

    console.log(typeof this.USER_VALUES.heatExponent);

    const getTemperatureDifference = function (heatFlow, heatReturn, heatTemperature) {
      return (
        (heatFlow - heatReturn) /
        Math.log((heatFlow - heatTemperature) / (heatReturn - heatTemperature))
      );
    };

    const userTempDifference = getTemperatureDifference(
      this.USER_VALUES.heatFlow,
      this.USER_VALUES.heatReturn,
      this.USER_VALUES.heatTemperature
    );

    const normTempDifference = getTemperatureDifference(
      this.NORM_VALUES.heatFlow,
      this.NORM_VALUES.heatReturn,
      this.NORM_VALUES.heatTemperature
    );

    return Math.round(
      this.USER_VALUES.heatValue *
      Math.exp(
        Math.log(userTempDifference / normTempDifference) *
        this.USER_VALUES.heatExponent
      )
    );
  },

  displayResult: function () {
    const resultElement = this.getDOM("result");
    resultElement.textContent = this.getNewCalculatedThermalOutput();
  },

  setDefaultInputValues: function () {
    const inputNodeList = document.querySelectorAll(".thermalOutputCalculator__input");
    inputNodeList.forEach(inputElement => {
      // Loop through the nodelist and add all default input values from the config to the USER_VALUES object
      this.USER_VALUES[inputElement.id] = this.config.inputValues[inputElement.id];
      // Add the values to the DOM input nodes
      inputElement.value = this.USER_VALUES[inputElement.id];
    });
  },

  setEventHandler: function () {
    const buttonElement = this.getDOM("button");
    buttonElement.addEventListener('click', () => this.displayResult());
  }
};

thermalOutputCalculator.init();
