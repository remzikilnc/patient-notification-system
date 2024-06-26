import { useState } from 'react';
import fetchServer from "@/lib/fetch-server";
const useForm = () => {
    const [errors, setErrors] = useState(null);

    const handleSubmit = async ({ event, endPoint, onSuccess, onError, method = "POST" }) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData);

        try {
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
                const formattedErrors = formatErrors(responseData.errors);
                setErrors(formattedErrors);
                onError(formattedErrors);
                return Promise.reject(formattedErrors);
            }
        } catch (error) {
            const genericError = { defaultMessage: "An unexpected error occurred. Please try again later." };
            setErrors({ globalError: genericError.defaultMessage });
            onError({ globalError: genericError.defaultMessage });
            return Promise.reject(genericError);
        }
    };

    function formatErrors(errors) {
        const errorMap = {};
        errors.forEach(error => {
            errorMap[error.field] = error.defaultMessage;
        });
        return errorMap;
    }

    return { handleSubmit, errors, setErrors };
};

export default useForm;