import { useFormik } from "formik"
import FormControl from "../../components/misc/FormControl"
import Input from "../../components/misc/Input"
import { loginSchema } from "./schemas/login.schema"
import { login as loginService } from "../../services/AuthServices"
import { useContext } from "react"
import AuthContext from "../../context/AuthContecx"
const INITIAL_VALUES = {
    email: "",
    password: ""
}

const Login = () => {
    const { login } = useContext(AuthContext)
    const { values, errors, touched, handleChange, handleBlur, isSubmitting, handleSubmit, setSubmitting, setFieldError } = useFormik({
        initialValues: INITIAL_VALUES,
        validateOnBlur: true,
        validateOnChange: false,
        validationSchema: loginSchema,

        onSubmit: (values) => {
            loginService({ email: values.email, password: values.password })
                .then(response => {
                    login(response.accessToken)
                })
                .catch(err => {
                    if (err?.response?.data?.message) {
                        setFieldError("email", err?.response?.data?.message)
                    } else {
                        setFieldError("email", err.message)
                    }
                    setSubmitting(false)
                })
        }
    })
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <FormControl text="Email" htmlFor="email" error={touched.email && errors.email} >
                    <Input
                        id="email"
                        name="email"
                        placeholder="Enter mail.."
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        error={touched.email && errors.email}
                    />

                </FormControl>

                <FormControl text="Password" htmlFor="password" error={touched.password && errors.password}>
                    <Input id="password"
                        name="password"
                        placeholder="Enter password.."
                        type="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        error={touched.password && errors.password}
                    />
                </FormControl>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "submiting" : "submit"}
                </button>
            </form>
        </div>
    )
}
export default Login;