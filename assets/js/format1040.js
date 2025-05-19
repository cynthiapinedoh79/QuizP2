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
  
  // Filing Status: Required
  form.addEventListener("submit", function (e) {
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

  // Married Filing Separately: Validate Spouse Info
  form.addEventListener("submit", function (e) {
    const filingStatus = document.querySelector('input[name="filingStatus"]:checked');
    const isSeparate = filingStatus && filingStatus.value === "separate";

    const separatelyspfname = document.getElementById("separatelyspfname");
    const separatelysplname = document.getElementById("separatelysplname");
    const separatelyspssn = document.getElementById("separatelyspssn");
    const separatelyspssnFbk = document.getElementById("separatelyspssnFbk");
    const marriedFSeparatelyFbk = document.getElementById("marriedFSeparatelyFbk");

    marriedFSeparatelyFbk.innerText = "";
    marriedFSeparatelyFbk.className = "";

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
        separatelyspssn.classList.remove("is-valid");
        separatelyspssnFbk.innerText = "Spouse SSN must be 9 digits.";
        separatelyspssnFbk.className = "error";
        valid = false;
      } else {
        separatelyspssn.classList.remove("is-invalid");
        separatelyspssn.classList.add("is-valid");
        separatelyspssnFbk.innerText = "Valid Spouse SSN";
        separatelyspssnFbk.className = "success";
      }

      if (!valid) {
        e.preventDefault();
        marriedFSeparatelyFbk.innerText = "Please fill in all required spouse fields for 'Married filing separately'.";
        marriedFSeparatelyFbk.className = "error";
      }
    }
  });

  // Utility for Spouse SSN
  const separatelyspssnInput = document.getElementById('separatelyspssn');
  const separatelyspssnFbk = document.getElementById("separatelyspssnFbk");

  function getRawSeparatelyspssn(value) {
    return value.replace(/\D/g, '').slice(0, 9);
  }

  function maskSeparatelyspssn(raw) {
    return raw.length === 9 ? '***-**-' + raw.slice(-4) : raw;
  }

  function validateSeparatelyspssnFields(fromSubmit = false) {
    const raw = getRawSeparatelyspssn(separatelyspssnInput.dataset.raw || '');

    if (!fromSubmit) {
      separatelyspssnFbk.innerText = '';
      separatelyspssnFbk.className = '';
    }

    if (raw.length === 9) {
      separatelyspssnFbk.innerText = 'Valid Spouse SSN';
      separatelyspssnFbk.className = 'success';
    } else if (raw.length > 0 && raw.length < 9) {
      separatelyspssnFbk.innerText = 'Spouse SSN must be 9 digits.';
      separatelyspssnFbk.className = 'error';
    }
  }

  separatelyspssnInput.addEventListener('focus', () => {
    separatelyspssnInput.value = separatelyspssnInput.dataset.raw || '';
  });

  separatelyspssnInput.addEventListener('input', () => {
    const raw = getRawSeparatelyspssn(separatelyspssnInput.value);
    separatelyspssnInput.dataset.raw = raw;
    separatelyspssnInput.value = raw;
    validateSeparatelyspssnFields();
  });

  separatelyspssnInput.addEventListener('blur', () => {
    const raw = getRawSeparatelyspssn(separatelyspssnInput.dataset.raw || '');
    separatelyspssnInput.dataset.raw = raw;
    separatelyspssnInput.value = maskSeparatelyspssn(raw);
  });

  // Head of Household with Child
  const hohRadio = document.getElementById("hohQualifying");
  const childNameInput = document.getElementById("childName");
  const childSsnInput = document.getElementById("childSsn");
  const childSsnFbk = document.getElementById("childSsnFbk");

  function getRawChildSsn(value) {
    return value.replace(/\D/g, '').slice(0, 9);
  }

  function maskChildSsn(raw) {
    return raw.length === 9 ? '***-**-' + raw.slice(-4) : raw;
  }

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

  form.addEventListener("submit", function (e) {
    const isHeadOfHousehold = hohRadio.checked;
    let isValid = true;

    childNameInput.classList.remove("is-invalid", "is-valid");
    childSsnInput.classList.remove("is-invalid", "is-valid");
    childSsnFbk.innerText = "";
    childSsnFbk.className = "";

    if (isHeadOfHousehold) {
      if (!childNameInput.value.trim()) {
        childNameInput.classList.add("is-invalid");
        isValid = false;
      } else {
        childNameInput.classList.add("is-valid");
      }

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

      if (!isValid) {
        e.preventDefault();
        form.classList.add("was-validated");
      }
    }
  });

  function validateChildSsnFields(fromSubmit = false) {
    const raw = getRawChildSsn(childSsnInput.dataset.raw || '');

    if (!fromSubmit) {
      childSsnFbk.innerText = '';
      childSsnFbk.className = '';
    }

    if (raw.length === 9) {
      childSsnFbk.innerText = 'Valid Child SSN';
      childSsnFbk.className = 'success';
    } else if (raw.length > 0 && raw.length < 9) {
      childSsnFbk.innerText = 'Child SSN must be 9 digits.';
      childSsnFbk.className = 'error';
    }
  }

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

  // Exemptions
  form.addEventListener("submit", function (e) {
    const exempYoursef = document.getElementById("exempYoursef");
    const exempSp = document.getElementById("exempSp");
    const exempFbk = document.getElementById("exempFbk");
    const exemp = document.getElementById("exemp");

    exempFbk.innerText = "";
    exempFbk.className = "";
    exemp.classList.remove("is-invalid", "is-valid");

    if (!exempYoursef.checked && !exempSp.checked) {
      e.preventDefault();
      exempFbk.innerText = "Please check at least one box for exemptions.";
      exempFbk.className = "error";
      exemp.classList.add("is-invalid");
    }
  });

  // Status 4 Nonresident Alien Spouse Fields
  form.addEventListener("submit", function (e) {
    const checkboxC = document.getElementById("fS4nonrSp");
    const s4sfname = document.getElementById("s4sfname");
    const s4slname = document.getElementById("s4slname");
    const s4sssn = document.getElementById("s4sssn");

    const chks4Fbk = document.getElementById("chks4Fbk");
    chks4Fbk.innerText = "";
    chks4Fbk.className = "";

    let valid = true;

    if (checkboxC.checked) {
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
      s4sfname.classList.remove("is-invalid");
      s4slname.classList.remove("is-invalid");
      s4sssn.classList.remove("is-invalid");
    }
  });

  // Update # of Exemptions
  const exempYoursef = document.getElementById('exempYoursef');
  const exempSp = document.getElementById('exempSp');

  function updateNbxc() {
    let count = 0;
    if (exempYoursef.checked) count++;
    if (exempSp.checked) count++;
    document.getElementById("nbxc").value = count;
  }

  exempYoursef.addEventListener('change', updateNbxc);
  exempSp.addEventListener('change', updateNbxc);
  updateNbxc();

});