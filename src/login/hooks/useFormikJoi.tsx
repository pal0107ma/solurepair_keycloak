import { useFormik } from "formik";
import { ObjectSchema } from "joi";
import { FormikValues, FormikHelpers } from "formik";

function useFormikJoi<T extends FormikValues>(
  initialValues: T,
  schema: ObjectSchema<T>,
  onSubmit?: (values: T, formikHelpers: FormikHelpers<T>) => void | Promise<any>
) {
  const validate = (values: T) => {
    const { error } = schema.validate(values, {
      abortEarly: false,
      allowUnknown: true
    });

    if (!error) return {};

    const errors: Record<string, string> = {};
    error.details.forEach(detail => {
      // Handle nested fields (e.g., 'address.street')
      const path = detail.path.join(".");
      errors[path] = detail.message;
    });
    return errors;
  };
  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: onSubmit || (() => {})
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));

    const { error } = schema.validate(data, {
      allowUnknown: true
    });

    if (error) return;

    e.currentTarget.submit();
  };

  return { ...formik, handleSubmit };
}

export default useFormikJoi;
