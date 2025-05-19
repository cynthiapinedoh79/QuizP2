document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("my-form");

  form.addEventListener("submit", handleSubmit);

  function handleSubmit(e) {
    e.preventDefault();
    const myFormData = e.target;

    // 1. Taxpayer Initial from First Name
    const fname = myFormData.fName.value.trim();
    document.getElementById("fnamei").value = fname ? fname.charAt(0).toUpperCase() : "";

    // 2. Spouse Initial from First Name
    const sfname = myFormData.sfName.value.trim();
    document.getElementById("sfnamei").value = sfname ? sfname.charAt(0).toUpperCase() : "";

    // --------------------------
    // SSN SECTION (Taxpayer)
    // --------------------------
    const ssnInput = document.getElementById('ssn');
    const cssnInput = document.getElementById('cssn');
    const ssnFbk = document.getElementById('ssnFbk');
    const cssnFbk = document.getElementById('cssnFbk');

    const getRaw = val => val.replace(/\D/g, '').slice(0, 9);
    const maskSSN = raw => raw.length === 9 ? '***-**-' + raw.slice(-4) : raw;

    const validateSSNFields = (fromSubmit = false) => {
      const ssnRaw = getRaw(ssnInput.dataset.raw || '');
      const cssnRaw = getRaw(cssnInput.dataset.raw || '');

      if (!fromSubmit) {
        ssnFbk.innerText = "";
        cssnFbk.innerText = "";
        ssnFbk.className = "";
        cssnFbk.className = "";
      }

      // SSN
      if (ssnRaw.length === 9) {
        ssnFbk.innerText = "Valid SSN";
        ssnFbk.className = "success";
        ssnInput.classList.add("is-valid");
        ssnInput.classList.remove("is-invalid");
      } else if (ssnRaw.length > 0) {
        ssnFbk.innerText = "SSN must be 9 digits.";
        ssnFbk.className = "error";
        ssnInput.classList.add("is-invalid");
        ssnInput.classList.remove("is-valid");
      }

      // Confirm SSN
      if (cssnRaw.length === 9) {
        cssnFbk.innerText = "Valid Confirmation SSN";
        cssnFbk.className = "success";
        cssnInput.classList.add("is-valid");
        cssnInput.classList.remove("is-invalid");
      } else if (cssnRaw.length > 0) {
        cssnFbk.innerText = "Confirmation SSN must be 9 digits.";
        cssnFbk.className = "error";
        cssnInput.classList.add("is-invalid");
        cssnInput.classList.remove("is-valid");
      }

      if (ssnRaw.length === 9 && cssnRaw.length === 9 && ssnRaw !== cssnRaw) {
        cssnFbk.innerText = "❌ SSN and confirmation do not match.";
        cssnFbk.className = "error";
        cssnInput.classList.add("is-invalid");
        cssnInput.classList.remove("is-valid");
      }
    };

    ssnInput.addEventListener("focus", () => ssnInput.value = getRaw(ssnInput.dataset.raw || ""));
    ssnInput.addEventListener("input", () => {
      const raw = getRaw(ssnInput.value);
      ssnInput.dataset.raw = raw;
      ssnInput.value = raw;
      validateSSNFields();
    });
    ssnInput.addEventListener("blur", () => {
      const raw = getRaw(ssnInput.dataset.raw || "");
      ssnInput.value = maskSSN(raw);
    });

    cssnInput.addEventListener("focus", () => cssnInput.value = getRaw(cssnInput.dataset.raw || ""));
    cssnInput.addEventListener("input", () => {
      const raw = getRaw(cssnInput.value);
      cssnInput.dataset.raw = raw;
      cssnInput.value = raw;
      validateSSNFields();
    });
    cssnInput.addEventListener("blur", () => {
      const raw = getRaw(cssnInput.dataset.raw || "");
      cssnInput.value = maskSSN(raw);
    });

    // --------------------------
    // Spouse SSN Section
    // --------------------------
    const sssnInput = document.getElementById('sssn');
    const csssnInput = document.getElementById('csssn');
    const sssnFbk = document.getElementById('sssnFbk');
    const csssnFbk = document.getElementById('csssnFbk');

    const validateSpouseSSN = (fromSubmit = false) => {
      const sssnRaw = getRaw(sssnInput.dataset.raw || "");
      const csssnRaw = getRaw(csssnInput.dataset.raw || "");

      if (!fromSubmit) {
        sssnFbk.innerText = "";
        csssnFbk.innerText = "";
        sssnFbk.className = "";
        csssnFbk.className = "";
      }

      if (sssnRaw.length === 9) {
        sssnFbk.innerText = "Valid Spouse SSN";
        sssnFbk.className = "success";
        sssnInput.classList.add("is-valid");
        sssnInput.classList.remove("is-invalid");
      } else if (sssnRaw.length > 0) {
        sssnFbk.innerText = "SSN must be 9 digits.";
        sssnFbk.className = "error";
        sssnInput.classList.add("is-invalid");
        sssnInput.classList.remove("is-valid");
      }

      if (csssnRaw.length === 9) {
        csssnFbk.innerText = "Valid Confirmation SSN";
        csssnFbk.className = "success";
        csssnInput.classList.add("is-valid");
        csssnInput.classList.remove("is-invalid");
      } else if (csssnRaw.length > 0) {
        csssnFbk.innerText = "Confirm SSN must be 9 digits.";
        csssnFbk.className = "error";
        csssnInput.classList.add("is-invalid");
        csssnInput.classList.remove("is-valid");
      }

      if (sssnRaw.length === 9 && csssnRaw.length === 9 && sssnRaw !== csssnRaw) {
        csssnFbk.innerText = "❌ SSN and confirmation do not match.";
        csssnFbk.className = "error";
        csssnInput.classList.add("is-invalid");
        csssnInput.classList.remove("is-valid");
      }
    };

    sssnInput.addEventListener("focus", () => sssnInput.value = getRaw(sssnInput.dataset.raw || ""));
    sssnInput.addEventListener("input", () => {
      const raw = getRaw(sssnInput.value);
      sssnInput.dataset.raw = raw;
      sssnInput.value = raw;
      validateSpouseSSN();
    });
    sssnInput.addEventListener("blur", () => sssnInput.value = maskSSN(getRaw(sssnInput.dataset.raw || "")));

    csssnInput.addEventListener("focus", () => csssnInput.value = getRaw(csssnInput.dataset.raw || ""));
    csssnInput.addEventListener("input", () => {
      const raw = getRaw(csssnInput.value);
      csssnInput.dataset.raw = raw;
      csssnInput.value = raw;
      validateSpouseSSN();
    });
    csssnInput.addEventListener("blur", () => csssnInput.value = maskSSN(getRaw(csssnInput.dataset.raw || "")));

    // --------------------------
    // ZIP CODE Section
    // --------------------------
    const zipInput = document.getElementById("zipcode");
    const zipcodeFbk = document.getElementById("zipcodeFbk");

    zipInput.addEventListener("input", (e) => {
      const val = e.target.value.replace(/\D/g, '').slice(0, 5);
      zipInput.value = val;
      if (/^\d{5}$/.test(val)) {
        zipcodeFbk.innerText = "Valid Zip Code";
        zipcodeFbk.className = "success";
      } else {
        zipcodeFbk.innerText = "Zip Code must be 5 digits.";
        zipcodeFbk.className = "error";
      }
    });

    if (!/^\d{5}$/.test(zipInput.value)) {
      zipcodeFbk.innerText = "Zip Code must be 5 digits.";
      zipcodeFbk.className = "error";
    }

    // --------------------------
    // PHONE Section
    // --------------------------
    const phoneInput = document.getElementById("phone");
    const phoneFbk = document.getElementById("phoneFbk");

    phoneInput.addEventListener("input", function (e) {
      let input = e.target.value.replace(/\D/g, "").slice(0, 10);
      e.target.value = formatPhone(input);
      phoneFbk.innerText = input.length === 10 ? "Valid Phone Number" : `Phone must be 10 digits. Currently: ${input.length} digits.`;
      phoneFbk.className = input.length === 10 ? "success" : "error";
    });

    // Spouse Phone
    const sphoneInput = document.getElementById("sphone");
    const sphoneFbk = document.getElementById("sphoneFbk");

    sphoneInput.addEventListener("input", function (e) {
      let input = e.target.value.replace(/\D/g, "").slice(0, 10);
      e.target.value = formatPhone(input);
      sphoneFbk.innerText = input.length === 10 ? "Valid Phone Number" : `Phone must be 10 digits. Currently: ${input.length} digits.`;
      sphoneFbk.className = input.length === 10 ? "success" : "error";
    });

    function formatPhone(input) {
      return input.length === 10 ? `(${input.slice(0, 3)}) ${input.slice(3, 6)}-${input.slice(6)}` : input;
    }

    // --------------------------
    // IMAGE PREVIEWS
    // --------------------------
    const previewHandler = (inputId, imgId) => {
      document.getElementById(inputId).addEventListener("change", function (e) {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function (ev) {
            const img = document.getElementById(imgId);
            img.src = ev.target.result;
            img.style.display = "block";
          };
          reader.readAsDataURL(file);
        }
      });
    };

    previewHandler("ssnPhoto", "ssnPreview");
    previewHandler("idPhoto", "idPreview");

    // --------------------------
    // SUCCESS CARD
    // --------------------------
    const successCard = document.getElementById("successCard");

    form.classList.remove("was-validated");
    if (form.checkValidity()) {
      successCard.style.display = "block";
      setTimeout(() => {
        successCard.style.display = "none";
        form.reset();
        ssnFbk.innerText = "";
        cssnFbk.innerText = "";
        document.getElementById("ssnPreview").style.display = "none";
        document.getElementById("idPreview").style.display = "none";
      }, 5000);
    } else {
      form.classList.add("was-validated");
    }

    // Optional: Save form data
    const formData = new FormData(form);
    fetch("/submit-data", {
        method: "POST",
        body: formData,
      }).then(response => response.json())
      .then(data => console.log("Success:", data))
      .catch(error => console.error("Error:", error));
  }

  /*Taxpayer Information: Presidential Election Campaign*/
  form.addEventListener("submit", function (e) {
    const filingJoint3 = document.getElementById("filingJoint3");
    const filingJoint3Sp = document.getElementById("filingJoint3Sp");
    const filingJoint3Fbk = document.getElementById("filingJoint3Fbk");
    const pec = document.getElementById("pec");

    // Reset any previous messages or styles
    filingJoint3Fbk.innerText = "";
    filingJoint3Fbk.className = "";
    pec.classList.remove("is-invalid");

    // If neither box is checked, display error
    if (!filingJoint3.checked && !filingJoint3Sp.checked) {
      e.preventDefault();
      filingJoint3Fbk.innerText = "Please check at least one box for the Presidential Election Campaign.";
      filingJoint3Fbk.className = "error";
      pec.classList.add("is-invalid");
    }
  });


  //  ----------------------------------------------------------------------------------------
  // Filing Status and Exemptions
  // -----------------------------------------------------------------------------------------
  
    /*If Filing Status is not selected*/
    document.getElementById("my-form").addEventListener("submit", function (e) {
      const selectedStatus = document.querySelector('input[name="filingStatus"]:checked');

      const filingStatusFbk = document.getElementById("filingStatusFbk");

      filingStatusFbk.innerText = "";
      filingStatusFbk.className = "";

      if (!selectedStatus) {
        e.preventDefault();
        filingStatusFbk.innerText = "Please select a Filing Status.";
        filingStatusFbk.className = "error";
      }
    });

    /*If Filing Status is Married Filing Separately*/

    /*Required inputs if Filing Status is Married Filing Separately is Checked*/
    document.getElementById("my-form").addEventListener("submit", function (e) {
      const filingStatus = document.querySelector('input[name="filingStatus"]:checked');
      const isSeparate = filingStatus && filingStatus.value === "separate";



      // Spouse Info fields
      const separatelyspfname = document.getElementById("separatelyspfname");
      const separatelysplname = document.getElementById("separatelysplname");
      const separatelyspssn = document.getElementById("separatelyspssn");

      const marriedFSeparatelyFbk = document.getElementById("marriedFSeparatelyFbk");
      marriedFSeparatelyFbk.innerText = "";
      marriedFSeparatelyFbk.className = "";

      // Set required if filing separately
      if (isSeparate) {
        let valid = true;

        if (!separatelyspfname.value.trim()) {
          separatelyspfname.classList.add("is-invalid");
          separatelyspfname.classList.remove("is-valid");
          valid = false;
        } else {
          separatelyspfname.classList.remove("is-invalid");
          separatelyspfname.classList.add("is-valid");
        }

        if (!separatelysplname.value.trim()) {
          separatelysplname.classList.add("is-invalid");
          separatelysplname.classList.remove("is-valid");
          valid = false;
        } else {
          separatelysplname.classList.remove("is-invalid");
          separatelysplname.classList.add("is-valid");
        }

        if (!/^\d{9}$/.test(separatelyspssn.value)) {
          separatelyspssn.classList.add("is-invalid");
          separatelyspssn.classList.remove("is-valid"); // <-- in case it was previously valid
          valid = false;
          valid = false;
        } else {
          separatelyspssn.classList.remove("is-invalid"); // <-- this line fixes the issue
          separatelyspssn.classList.add("is-valid"); // <-- this line applies the green/valid styling
          separatelyspssnFbk.innerText = 'Valid Spouse SSN';
          separatelyspssnFbk.className = 'success';
        }


        if (!valid) {
          e.preventDefault();

          marriedFSeparatelyFbk.innerText = "Please fill in all required spouse fields for 'Married filing separately'.";
          marriedFSeparatelyFbk.className = "error";
        }
      }
    });

    // Spouse SSN for Married Filing Separately
    //---------------------------------------------------------------------------
    // Spouse SSN Input & Feedback Elements
    const separatelyspssnInput = document.getElementById('separatelyspssn');
    const separatelyspssnFbk = document.getElementById("separatelyspssnFbk");

    // Utility Functions
    function getRawSeparatelyspssn(value) {
      return value.replace(/\D/g, '').slice(0, 9);
    }

    function maskSeparatelyspssn(raw) {
      return raw.length === 9 ? '***-**-' + raw.slice(-4) : raw;
    }

    // Validation Function
    function validateSeparatelyspssnFields(fromSubmit = false) {
      const separatelyspssnRaw = getRawSeparatelyspssn(separatelyspssnInput.dataset.raw || '');

      // Clear previous messages if not submitting
      if (!fromSubmit) {
        separatelyspssnFbk.innerText = '';
        separatelyspssnFbk.className = '';
      }

      // Show error if incomplete SSN
      if (separatelyspssnRaw.length === 9) {
        separatelyspssnFbk.innerText = 'Valid Spouse SSN';
        separatelyspssnFbk.className = 'success';
      } else if (separatelyspssnRaw.length > 0 && separatelyspssnRaw.length < 9) {
        separatelyspssnFbk.innerText = 'Spouse SSN must be 9 digits.';
        separatelyspssnFbk.className = 'error';
      }

    }

    // Input Events
    separatelyspssnInput.addEventListener('focus', () => {
      separatelyspssnInput.value = separatelyspssnInput.dataset.raw || '';
    });

    separatelyspssnInput.addEventListener('input', () => {
      const raw = getRawSeparatelyspssn(separatelyspssnInput.value);
      separatelyspssnInput.dataset.raw = raw;
      separatelyspssnInput.value = raw; // Show raw input while typing
      validateSeparatelyspssnFields();
    });

    separatelyspssnInput.addEventListener('blur', () => {
      const raw = getRawSeparatelyspssn(separatelyspssnInput.dataset.raw || '');
      separatelyspssnInput.dataset.raw = raw;
      separatelyspssnInput.value = maskSeparatelyspssn(raw);
    });

    // Submit Handler
    form.addEventListener('submit', (e) => {
      e.preventDefault(); // Prevent form submission until validated

      const filingStatus = document.querySelector('input[name="filingStatus"]:checked');
      const isSeparate = filingStatus && filingStatus.value === "separate";

      let separatelyValid = true;

      // Clear previous feedback
      separatelyspssnFbk.innerText = '';
      separatelyspssnFbk.className = '';

      if (isSeparate) {
        const separatelyspssnRaw = separatelyspssnInput.dataset.raw || '';

        if (separatelyspssnRaw.length !== 9) {
          separatelyspssnInput.classList.add("is-invalid");
          separatelyspssnInput.classList.remove("is-valid");
          separatelyspssnFbk.innerText = 'Spouse SSN must be 9 digits.';
          separatelyspssnFbk.className = 'error';
          separatelyValid = false;
        } else {
          separatelyspssnInput.classList.remove("is-invalid");
          separatelyspssnInput.classList.add("is-valid");
          separatelyspssnFbk.innerText = 'Valid Spouse SSN';
          separatelyspssnFbk.className = 'success';
        }

        validateSeparatelyspssnFields(true);
        separatelyspssnInput.value = maskSeparatelyspssn(separatelyspssnRaw);

        // Mask values after submit
        separatelyspssnInput.value = maskSeparatelyspssn(separatelyspssnRaw);
      }

    });



    //---------------------------------------------------------------------------

    // If Head of household (with qualifying person) is checked then required ChildSsn and childName
    const hohRadio = document.getElementById("hohQualifying");
    const childNameInput = document.getElementById("childName");
    const childSsnInput = document.getElementById("childSsn");
    const childSsnFbk = document.getElementById("childSsnFbk");

    // Utility functions
    function getRawChildSsn(value) {
      return value.replace(/\D/g, '').slice(0, 9);
    }

    function maskChildSsn(raw) {
      return raw.length === 9 ? '***-**-' + raw.slice(-4) : raw;
    }

    // Input & blur formatting
    childSsnInput.addEventListener("input", () => {
      const raw = getRawChildSsn(childSsnInput.value);
      childSsnInput.dataset.raw = raw;
      childSsnInput.value = raw;
    });

    childSsnInput.addEventListener("blur", () => {
      const raw = getRawChildSsn(childSsnInput.dataset.raw || '');
      childSsnInput.dataset.raw = raw;
      childSsnInput.value = maskChildSsn(raw);
    });

    // Final validation on submit
    form.addEventListener("submit", function (e) {
      const isHeadOfHousehold = hohRadio.checked;
      let isValid = true;

      // Reset child inputs
      childNameInput.classList.remove("is-invalid", "is-valid");
      childSsnInput.classList.remove("is-invalid", "is-valid");
      childSsnFbk.innerText = "";
      childSsnFbk.className = "";

      if (isHeadOfHousehold) {
        // Validate child name
        if (!childNameInput.value.trim()) {
          childNameInput.classList.add("is-invalid");
          isValid = false;
        } else {
          childNameInput.classList.add("is-valid");
        }

        // Validate SSN
        const raw = getRawChildSsn(childSsnInput.dataset.raw || "");
        if (raw.length !== 9) {
          childSsnInput.classList.add("is-invalid");
          childSsnFbk.innerText = "Child SSN must be 9 digits.";
          childSsnFbk.className = "error";
          isValid = false;
        } else {
          childSsnInput.classList.add("is-valid");
          childSsnFbk.innerText = "Valid Child SSN";
          childSsnFbk.className = "success";
          childSsnInput.value = maskChildSsn(raw);
        }
      }

      // Trigger full form validation feedback if invalid
      if (!isValid) {
        e.preventDefault();
        form.classList.add("was-validated");
      }
    });

    //---------------------------------------------------------------------------
    // Child SSN Input & Feedback Elements

    // Utility Functions defined previously

    // Validation Function
    function validateChildSsnFields(fromSubmit = false) {
      const childSsnRaw = getRawChildSsn(childSsnInput.dataset.raw || '');

      if (!fromSubmit) {
        childSsnFbk.innerText = '';
        childSsnFbk.className = '';
      }

      if (childSsnRaw.length === 9) {
        childSsnFbk.innerText = 'Valid Child SSN';
        childSsnFbk.className = 'success';
      } else if (childSsnRaw.length > 0 && childSsnRaw.length < 9) {
        childSsnFbk.innerText = 'Child SSN must be 9 digits.';
        childSsnFbk.className = 'error';
      }
    }

    // Input Events
    childSsnInput.addEventListener('focus', () => {
      childSsnInput.value = childSsnInput.dataset.raw || '';
    });

    childSsnInput.addEventListener('input', () => {
      const raw = getRawChildSsn(childSsnInput.value);
      childSsnInput.dataset.raw = raw;
      childSsnInput.value = raw;
      validateChildSsnFields();
    });

    childSsnInput.addEventListener('blur', () => {
      const raw = getRawChildSsn(childSsnInput.dataset.raw || '');
      childSsnInput.dataset.raw = raw;
      childSsnInput.value = maskChildSsn(raw);
    });

    // Submit Handler
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const filingStatus = document.querySelector('input[name="filingStatus"]:checked');
      const isSeparate = filingStatus && filingStatus.value === "separate";

      let childValid = true;

      childSsnFbk.innerText = '';
      childSsnFbk.className = '';

      if (isSeparate) {
        const childSsnRaw = childSsnInput.dataset.raw || '';

        if (childSsnRaw.length !== 9) {
          childSsnInput.classList.add("is-invalid");
          childSsnInput.classList.remove("is-valid");
          childSsnFbk.innerText = 'Child SSN must be 9 digits.';
          childSsnFbk.className = 'error';
          childValid = false;
        } else {
          childSsnInput.classList.remove("is-invalid");
          childSsnInput.classList.add("is-valid");
          childSsnFbk.innerText = 'Valid Child SSN';
          childSsnFbk.className = 'success';
        }

        validateChildSsnFields(true);
        childSsnInput.value = maskChildSsn(childSsnRaw);
      }
    });


    //---------------------------------------------------------------------------

    /*Exemptions*/
    document.getElementById("my-form").addEventListener("submit", function (e) {
      const exempYoursef = document.getElementById("exempYoursef");
      const exempSp = document.getElementById("exempSp");
      const exempFbk = document.getElementById("exempFbk");
      const exemp = document.getElementById("exemp");

      // Clear previous state
      exempFbk.innerText = "";
      exempFbk.className = "";
      exemp.classList.remove("is-invalid");
      exemp.classList.remove("is-valid");

      // Validation
      if (!exempYoursef.checked && !exempSp.checked) {
        e.preventDefault();

        exempFbk.innerText = "Please check at least one box for exemptions.";
        exempFbk.className = "error";
        exemp.classList.add("is-invalid");
      }
    });

    /*Check If (c)
    If You are using filing status 4 and claiminng nonresident alien spouse*/
    document.getElementById("my-form").addEventListener("submit", function (e) {
      const checkboxC = document.getElementById("fS4nonrSp");
      const s4sfname = document.getElementById("s4sfname");
      const s4slname = document.getElementById("s4slname");
      const s4sssn = document.getElementById("s4sssn");

      const chks4Fbk = document.getElementById("chks4Fbk");
      chks4Fbk.innerText = "";
      chks4Fbk.className = "";

      let valid = true;

      if (checkboxC.checked) {
        // Check if required spouse fields are filled
        if (!s4sfname.value.trim()) {
          s4sfname.classList.add("is-invalid");
          valid = false;
        } else {
          s4sfname.classList.remove("is-invalid");
        }

        if (!s4slname.value.trim()) {
          s4slname.classList.add("is-invalid");
          valid = false;
        } else {
          s4slname.classList.remove("is-invalid");
        }

        if (!/^\d{9}$/.test(s4sssn.value)) {
          s4sssn.classList.add("is-invalid");
          valid = false;
        } else {
          s4sssn.classList.remove("is-invalid");
        }

        if (!valid) {
          e.preventDefault();
          chks4Fbk.innerText = "Please fill in all required spouse info for status 4 with nonresident spouse.";
          chks4Fbk.className = "error";
        }
      } else {
        // Clean up if unchecked
        s4sfname.classList.remove("is-invalid");
        s4slname.classList.remove("is-invalid");
        s4sssn.classList.remove("is-invalid");
      }
    });

    // References to the elements
    const exempYoursef = document.getElementById('exempYoursef');
    const exempSp = document.getElementById('exempSp');

    function updateNbxc() {
      let count = 0;
      if (exempYoursef.checked) count++;
      if (exempSp.checked) count++;
      document.getElementById("nbxc").value = count;
    }

    // Listen for changes on the checkboxes
    exempYoursef.addEventListener('change', updateNbxc);
    exempSp.addEventListener('change', updateNbxc);

    // Initialize value when page loads
    updateNbxc();

});