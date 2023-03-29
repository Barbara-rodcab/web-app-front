import * as Yup from "yup"; // todo lo que esté en el paquete de Yup me lo traes.

export const loginSchema = Yup.object({ // son las validaciones
    email: Yup
        .string("Email error")
        .email("inavlid email")
        .required("its required"),
    password: Yup
        .string("password error")
        .min(8, "error lenght")
        .required("its required")
}
)