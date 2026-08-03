const units = document.getElementById('units');
const usFields = document.getElementById('usFields');
const metricFields = document.getElementById('metricFields');
const result = document.getElementById('result');

units.addEventListener('change', () => {
  const metric = units.value === 'metric';
  usFields.style.display = metric ? 'none' : 'block';
  metricFields.style.display = metric ? 'block' : 'none';
  result.style.display = 'none';
});

document.getElementById('calculateBtn').addEventListener('click', () => {
  let bmi, minWeight, maxWeight, unitLabel;

  if (units.value === 'us') {
    const feet = parseFloat(document.getElementById('feet').value);
    const inches = parseFloat(document.getElementById('inches').value || 0);
    const pounds = parseFloat(document.getElementById('pounds').value);

    if (!feet || feet < 1 || inches < 0 || inches >= 12 || !pounds || pounds <= 0) {
      showError('Please enter a valid height and weight.');
      return;
    }

    const totalInches = feet * 12 + inches;
    bmi = (pounds / (totalInches * totalInches)) * 703;
    minWeight = 18.5 * totalInches * totalInches / 703;
    maxWeight = 24.9 * totalInches * totalInches / 703;
    unitLabel = 'lb';
  } else {
    const cm = parseFloat(document.getElementById('centimeters').value);
    const kg = parseFloat(document.getElementById('kilograms').value);

    if (!cm || cm <= 0 || !kg || kg <= 0) {
      showError('Please enter a valid height and weight.');
      return;
    }

    const meters = cm / 100;
    bmi = kg / (meters * meters);
    minWeight = 18.5 * meters * meters;
    maxWeight = 24.9 * meters * meters;
    unitLabel = 'kg';
  }

  const category =
    bmi < 18.5 ? 'Underweight' :
    bmi < 25 ? 'Healthy weight' :
    bmi < 30 ? 'Overweight' : 'Obesity';

  result.innerHTML = `
    <div>Your BMI is <strong>${bmi.toFixed(1)}</strong></div>
    <div>Category: <strong>${category}</strong></div>
    <div style="margin-top:10px">Estimated healthy-weight range for this height:
      <strong>${minWeight.toFixed(1)}–${maxWeight.toFixed(1)} ${unitLabel}</strong>
    </div>
  `;
  result.style.display = 'block';
});

function showError(message) {
  result.innerHTML = `<strong>${message}</strong>`;
  result.style.display = 'block';
}
