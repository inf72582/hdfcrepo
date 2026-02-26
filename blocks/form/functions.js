/**
 * Get Full Name
 * @name getFullName Concats first name and last name
 * @param {string} firstname in Stringformat
 * @param {string} lastname in Stringformat
 * @return {string}
 */
function getFullName(firstname, lastname) {
  return `${firstname} ${lastname}`.trim();
}

/**
 * Custom submit function
 * @param {scope} globals
 */
function submitFormArrayToString(globals) {
  const data = globals.functions.exportData();
  Object.keys(data).forEach((key) => {
    if (Array.isArray(data[key])) {
      data[key] = data[key].join(',');
    }
  });
  globals.functions.submitForm(data, true, 'application/json');
}

/**
 * Calculate the number of days between two dates.
 * @param {*} endDate
 * @param {*} startDate
 * @returns {number} returns the number of days between two dates
 */
function days(endDate, startDate) {
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate;

  // return zero if dates are valid
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return 0;
  }

  const diffInMs = Math.abs(end.getTime() - start.getTime());
  return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
}

/**
* Masks the first 5 digits of the mobile number with *
* @param {*} mobileNumber
* @returns {string} returns the mobile number with first 5 digits masked
*/
function maskMobileNumber(mobileNumber) {
  if (!mobileNumber) {
    return '';
  }
  const value = mobileNumber.toString();
  // Mask first 5 digits and keep the rest
  return ` ${'*'.repeat(5)}${value.substring(5)}`;
}
/**
 * Starts a 21-second countdown and writes it into a text input (by name).
 * Intended for AEM Forms EDS/Core Components and callable from Rule Editor.
 *
 * @param {string} fieldName - Name of the input field (e.g., "otpTimer")
 * @param {Object} [opts]
 * @param {string} [opts.resendSelector] - Optional CSS selector for a "Resend OTP" button to disable/enable during countdown
 * @param {function(number): string} [opts.format] - Optional formatter for displayed text (default: "XX sec")
 */
function startTwentyOneSecondTimer(fieldName, opts) {
  opts = opts || {};
  var format = typeof opts.format === "function" ? opts.format : function (s) { return s + " sec"; };
  var resendSelector = opts.resendSelector;
 
  // Ensure a registry exists to prevent duplicate timers per field
  window.__otpTimers = window.__otpTimers || {};
 
  // Locate the target input by its name
  var input = document.querySelector('[name="' + fieldName + '"]');
  if (!input) {
    console.warn('startTwentyOneSecondTimer: input with name="' + fieldName + '" not found.');
    return;
  }
 
  // Optional: disable a "Resend OTP" button while counting
  var resendBtn = resendSelector ? document.querySelector(resendSelector) : null;
  if (resendBtn) resendBtn.disabled = true;
 
  // Clear an existing timer on the same field (avoid duplicates)
  if (window.__otpTimers[fieldName]) {
    clearInterval(window.__otpTimers[fieldName].intervalId);
    delete window.__otpTimers[fieldName];
  }
 
  var seconds = 21;
  var prevReadonly = input.readOnly;
  input.readOnly = true;
  input.value = format(seconds);
 
  var id = setInterval(function () {
    seconds -= 1;
    if (seconds <= 0) {
      input.value = format(0);
      clearInterval(id);
      input.readOnly = prevReadonly;
      if (resendBtn) resendBtn.disabled = false;
      delete window.__otpTimers[fieldName];
      return;
    }
    input.value = format(seconds);
  }, 1000);
 
  // Store timer metadata for possible early stop
  window.__otpTimers[fieldName] = { intervalId: id, prevReadonly: prevReadonly, resendSelector: resendSelector };
}
 
 
 
 
// eslint-disable-next-line import/prefer-default-export
export { getFullName, days, submitFormArrayToString, maskMobileNumber ,startTwentyOneSecondTimer };
