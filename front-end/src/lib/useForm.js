import {useState} from "react";
import fetchServer from "@/lib/fetch-server";

const useForm = () => {
  const [errors, setErrors] = useState(null);

  const handleSubmit = async ({event, formObj, endPoint, onSuccess, onError, method = "POST"}) => {
    event?.preventDefault();
    let data = {};

    if (event) {
      const formData = new FormData(event.currentTarget);
      data = {...data, ...Object.fromEntries(formData)};
    }

    if (formObj) {
      data = {...data, ...formObj};
    }
    const response = await fetchServer({
      method,
      endpoint: `/${endPoint}`,
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (response.ok) {
      setErrors(null);
      onSuccess(responseData);
      return responseData;
    } else {
      setErrors(formatErrors(responseData.errors));
      onError(responseData);
    }
  };

  function formatErrors(errors) {
    const errorMap = {};
    errors.forEach(error => {
      errorMap[error.field] = error.defaultMessage;
    });
    return errorMap;
  }

  return {handleSubmit, errors, setErrors};
};

export default useForm;
