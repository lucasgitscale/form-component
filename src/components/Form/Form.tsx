import React from "react";
import { useLucasForm } from "../../hooks/useLucasForm";

function Form() {
  const lucasForm = useLucasForm({
    initialValues: {
      name: {
        value: "",
        required: true,
        minLength: 3,
        maxLength: 10,
        type: "string",
      },
    },
    onSubmit: (values) => {
      console.log("submiting with the following values ===> ", values);
    },
  });

  return (
    <div className="flex h-screen border-b-2 bg-slate-300 ">
      <div className="container border-blue-0 bg-indigo-100 mx-auto grid place-items-center">
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
              value={lucasForm.values.name}
            />
          </div>
          <div className="flex gap-3">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
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
        </form>
      </div>
    </div>
  );
}

export default Form;
