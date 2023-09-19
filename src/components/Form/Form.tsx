import React from "react";
import { useLucasForm } from "../../hooks/useLucasForm";
const CITIES = ["Paris", "London", "New York"];
function Form() {
  const lucasForm = useLucasForm({
    initialValues: {
      name: {
        value: "",
      },
      age: {
        value: "",
      },
      email: {
        value: "",
      },
      city: {
        value: CITIES[0],
      },
    },
    // we can define the validation rules for each field
    schemaValidation: {
      name: (inputValue: any) => {
        if (inputValue === "") {
          return "Name is required";
        } else if (inputValue.length < 3) {
          return "Name must be at least 3 characters long";
        } else if (inputValue.length > 20) {
          return "Name must be at most 20 characters long";
        }
      },
      email: (inputValue: any) => {
        if (inputValue === "") {
          return "Email is required";
        } else if (!inputValue.includes("@")) {
          return "Email must contain @";
        }
      },
      age: (inputValue: any) => {
        if (!inputValue) {
          return "Age is required";
        } else if (inputValue < 18) {
          console.log("inputValue  mayor a 18===> ", inputValue);
          return "You must be at least 18 years old";
        } else if (inputValue > 99) {
          return "You must be at most 99 years old";
        }
      },
      city: (inputValue: any) => {
        console.log("inputValue ===> ", inputValue, inputValue === "");
        if (inputValue === "") {
          return "City is required";
        }
      },
    },
    onSubmit: (values) => {
      console.log("submiting with the following values ===> ", values);
    },
  });

  return (
    <div className="flex h-screen border-b-2 bg-slate-300 ">
      <div className="container border-blue-0 bg-indigo-100 mx-auto grid place-items-center ">
        <form
          onSubmit={lucasForm.handleSubmit}
          className="border-gray-100 bg-slate-300 border-3 w-1/3  h-1/3 grid place-items-center rounded-md"
        >
          <div>
            <label htmlFor="name"></label>
            <input
              type="text"
              name="name"
              onChange={lucasForm.handleChange}
              value={lucasForm.values.name.value}
              onBlur={lucasForm.handleBlur}
            />
            {lucasForm.errors.name && lucasForm.errors.name}
          </div>
          <div>
            <label htmlFor="age"></label>
            <input
              type="number"
              name="age"
              onChange={lucasForm.handleChange}
              value={lucasForm.values.age.value}
              onBlur={lucasForm.handleBlur}
            />
            <div className="flex">
              {lucasForm.errors.age && lucasForm.errors.age}
            </div>
          </div>
          <div>
            <label htmlFor="city" />
            <select
              onChange={lucasForm.handleChange}
              name="city"
              value={lucasForm.values.city.value}
              onBlur={lucasForm.handleBlur}
            >
              {CITIES.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-3">
            <button
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                lucasForm.onSubmitting ||
                Object.values(lucasForm.errors).length > 0
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              type="submit"
              disabled={
                lucasForm.onSubmitting ||
                Object.values(lucasForm.errors).length > 0
              }
            >
              Submit
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              type="reset"
              onClick={lucasForm.handleReset}
            >
              Reset
            </button>
          </div>
          <div className="flex">
            {lucasForm.generalError ? lucasForm.generalError : null}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
