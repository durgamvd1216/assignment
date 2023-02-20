const container = document.querySelector("#form-container");

const form = document.createElement("form");
form.setAttribute("id", "my-form");
form.setAttribute("name", "my-form");
form.setAttribute("action", "javascript:handleSubmit(event)");

const formData = fetchFormData();
formData
  .then(function (res) {
    return res.json();
  })
  .then(function (response) {
    response.forEach((field) => {
      const fieldWrapper = document.createElement("div");
      fieldWrapper.setAttribute("class", "form-group");
      if (field.type === "radio") {
        createRadioField(field, fieldWrapper);
      } else {
        createField(field, fieldWrapper);
      }
      form.appendChild(fieldWrapper);
    });

    const submitButton = document.createElement("input");
    submitButton.setAttribute("type", "submit");
    submitButton.textContent = "Submit";

    form.appendChild(submitButton);
    container.appendChild(form);
  });

function createField(field, fieldWrapper) {
  const label = document.createElement("label");
  label.setAttribute("for", field.id);
  label.textContent = field.label;

  const input = document.createElement("input");
  input.setAttribute("type", field.type);
  input.setAttribute("name", field.name);
  input.setAttribute("id", field.id);
  input.required = field.required;

  if (field.pattern) {
    input.setAttribute("pattern", field.pattern);
  }

  fieldWrapper.appendChild(label);
  fieldWrapper.appendChild(input);
}

function createRadioField(field, fieldWrapper) {
  const legend = document.createElement("legend");
  legend.textContent = field.legend;
  fieldWrapper.appendChild(legend);

  field.options.forEach((option) => {
    const input = document.createElement("input");
    input.setAttribute("type", field.type);
    input.setAttribute("name", field.name);
    input.setAttribute("id", option.id);
    input.setAttribute("value", option.value);
    input.required = field.required;

    const label = document.createElement("label");
    label.setAttribute("for", option.id);
    label.textContent = option.label;

    fieldWrapper.appendChild(input);
    fieldWrapper.appendChild(label);
  });
}

var handleSubmit = function () {
  const form = document.forms["my-form"];
  const obj = [];
  Array.from(form.elements).forEach((input) => {
    if (input.type !== "radio" && input.value) {
      let ob = {};
      ob[input.name] = input.value;
      obj.push(ob);
    } else {
      if (input.checked) {
        let ob = {};
        ob[input.name] = input.value;
        obj.push(ob);
      }
    }
  });
  submitData(obj);
};
var submitData = function (data) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  fetch("https://putsreq.com/RWhI8ht10y5kqfmemrML", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      alert("Form submitted successfully");
    })
    .catch((error) => {
      alert(error);
    });
};

function fetchFormData() {
  return fetch("https://mocki.io/v1/84954ef5-462f-462a-b692-6531e75c220d", {
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
}
