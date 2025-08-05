// Tab switching
document.addEventListener("DOMContentLoaded", function () {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const sections = document.querySelectorAll(".converter-section");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetTab = button.getAttribute("data-tab");

      // Remove active class from all buttons and sections
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      sections.forEach((section) => section.classList.remove("active"));

      // Add active class to clicked button and corresponding section
      button.classList.add("active");
      document.getElementById(targetTab).classList.add("active");
    });
  });
});

// File Transfer Calculator
function calculateTransferTime() {
  const fileSize = parseFloat(document.getElementById("file-size").value);
  const sizeUnit = document.getElementById("size-unit").value;
  const transferSpeed = parseFloat(
    document.getElementById("transfer-speed").value
  );
  const speedUnit = document.getElementById("speed-unit").value;
  const resultDiv = document.getElementById("transfer-result");

  if (!fileSize || !transferSpeed || fileSize <= 0 || transferSpeed <= 0) {
    resultDiv.textContent =
      "Please enter valid positive numbers for both file size and transfer speed.";
    resultDiv.className = "result empty";
    return;
  }

  // Convert file size to bytes
  const sizeMultipliers = {
    B: 1,
    KB: 1024,
    MB: 1024 * 1024,
    GB: 1024 * 1024 * 1024,
    TB: 1024 * 1024 * 1024 * 1024,
  };

  // Convert speed to bytes per second
  const speedMultipliers = {
    Bps: 1,
    KBps: 1024,
    MBps: 1024 * 1024,
    GBps: 1024 * 1024 * 1024,
    Kbps: 1024 / 8, 
    Mbps: (1024 * 1024) / 8,
    Gbps: (1024 * 1024 * 1024) / 8,
  };

  const fileSizeBytes = fileSize * sizeMultipliers[sizeUnit];
  const speedBytesPerSecond = transferSpeed * speedMultipliers[speedUnit];

  const totalSeconds = fileSizeBytes / speedBytesPerSecond;

  // Convert to hours, minutes, seconds
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  let timeString = "";
  if (hours > 0) timeString += `${hours}h `;
  if (minutes > 0) timeString += `${minutes}m `;
  timeString += `${seconds}s`;

  resultDiv.textContent = `Transfer time: ${timeString} (${totalSeconds.toFixed(
    2
  )} seconds total)`;
  resultDiv.className = "result";
}

// Temperature Converter
function convertFromCelsius() {
  const celsius = parseFloat(document.getElementById("temp-celsius").value);
  const fahrenheitInput = document.getElementById("temp-fahrenheit");
  const resultDiv = document.getElementById("temp-result");

  if (isNaN(celsius)) {
    fahrenheitInput.value = "";
    resultDiv.textContent = "Enter a temperature to see the conversion";
    resultDiv.className = "result empty";
    return;
  }

  const fahrenheit = (celsius * 9) / 5 + 32;
  fahrenheitInput.value = fahrenheit.toFixed(2);

  resultDiv.textContent = `${celsius}°C = ${fahrenheit.toFixed(2)}°F`;
  resultDiv.className = "result";
}

function convertFromFahrenheit() {
  const fahrenheit = parseFloat(
    document.getElementById("temp-fahrenheit").value
  );
  const celsiusInput = document.getElementById("temp-celsius");
  const resultDiv = document.getElementById("temp-result");

  if (isNaN(fahrenheit)) {
    celsiusInput.value = "";
    resultDiv.textContent = "Enter a temperature to see the conversion";
    resultDiv.className = "result empty";
    return;
  }

  const celsius = ((fahrenheit - 32) * 5) / 9;
  celsiusInput.value = celsius.toFixed(2);

  resultDiv.textContent = `${fahrenheit}°F = ${celsius.toFixed(2)}°C`;
  resultDiv.className = "result";
}

// Scientific Notation Converter
function convertToScientific() {
  const number = parseFloat(document.getElementById("normal-number").value);
  const resultDiv = document.getElementById("scientific-result");

  if (isNaN(number)) {
    resultDiv.textContent = "Please enter a valid number.";
    resultDiv.className = "result empty";
    return;
  }

  if (number === 0) {
    resultDiv.textContent = "0 = 0.0 × 10⁰";
    resultDiv.className = "result";
    return;
  }

  const exponent = Math.floor(Math.log10(Math.abs(number)));
  const mantissa = number / Math.pow(10, exponent);

  resultDiv.textContent = `${number} = ${mantissa.toFixed(
    2
  )} × 10${getSuperscript(exponent)}`;
  resultDiv.className = "result";
}

function getSuperscript(num) {
  const superscripts = {
    0: "⁰",
    1: "¹",
    2: "²",
    3: "³",
    4: "⁴",
    5: "⁵",
    6: "⁶",
    7: "⁷",
    8: "⁸",
    9: "⁹",
    "-": "⁻",
  };
  return num
    .toString()
    .split("")
    .map((char) => superscripts[char] || char)
    .join("");
}

// Metric Prefix Converter
function convertMetricPrefix() {
  const value = parseFloat(document.getElementById("metric-value").value);
  const fromPrefix = document.getElementById("from-prefix").value;
  const toPrefix = document.getElementById("to-prefix").value;
  const resultDiv = document.getElementById("metric-result");

  if (isNaN(value)) {
    resultDiv.textContent = "Please enter a valid number.";
    resultDiv.className = "result empty";
    return;
  }

  const prefixValues = {
    T: 1e12,
    G: 1e9,
    M: 1e6,
    k: 1e3,
    "": 1,
    m: 1e-3,
    μ: 1e-6,
    n: 1e-9,
    p: 1e-12,
  };

  const fromValue = prefixValues[fromPrefix];
  const toValue = prefixValues[toPrefix];

  const baseValue = value * fromValue;
  const result = baseValue / toValue;

  const fromUnit = fromPrefix || "base";
  const toUnit = toPrefix || "base";

  resultDiv.textContent = `${value} ${fromUnit}unit = ${result.toExponential(
    3
  )} ${toUnit}unit`;
  resultDiv.className = "result";
}
