import { useAuth } from "../../auth";

// fake auth data
const testAuthData = {
  email: "test.username@test.test",
  password: "12345",
};

const testAuthData2 = {
  email: "test.username2@test.test",
  password: "98765",
};

const LoginPage = () => {
  const { authentication } = useAuth();
  const authData = testAuthData;

  return (
    <>
      {"Login Page"}
      <p>
        <button onClick={() => authentication.signIn({ authData })}>
          Test Login
        </button>
      </p>
      <p>
        <button
          onClick={() => authentication.signIn({ authData: testAuthData2 })}
        >
          Test Login (another user)
        </button>
      </p>
      <p>
        <button
          onClick={() =>
            authentication.signIn({
              authData: undefined,
            })
          }
        >
          Test Wrong Login
        </button>
      </p>
    </>
  );
};

export default LoginPage;
