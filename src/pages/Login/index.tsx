import styles from "~/pages/Login/index.module.scss";
import { Form, useActionData, useNavigation } from "react-router-dom";
import { Spinner } from "~/components";

const SubmitButton = () => {
    const navigation = useNavigation();

    const is_submitting = navigation.state === "submitting" && navigation.formAction === "/login";

    if (is_submitting)
        return (
            <button className={`${styles.submit} ${styles.submitting}`}>
                <Spinner width={31} height={31} />
            </button>
        );

    return <input type="submit" value="Login" />;
};

const Login = () => {
    const errors = useActionData() as any;

    return (
        <Form method="post" action="/login" className={styles.container}>
            <h1>Login</h1>

            <br />
            <hr />
            <br />

            <div className={styles.formInput}>
                <input name="username" type="text" placeholder="username" />
                <span className={styles.error}>{errors?.username}</span>
            </div>

            <div className={styles.formInput}>
                <input name="password" type="password" placeholder="password" />
                <span className={styles.error}>{errors?.password}</span>
            </div>

            <SubmitButton />
        </Form>
    );
};

export default Login;
