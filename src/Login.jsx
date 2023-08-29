import { Show, createSignal } from "solid-js";
import axios from "axios";

function Login({ setToken }) {
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [error, setError] = createSignal(null);

  async function getUserToken() {
    await axios
      .post(
        "http://localhost:8040/auth/signin",
        { email: email(), password: password() },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.result.token}`;
        setToken(response.data.result.token);
        setError(null);
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  }

  return (
    <div class="container">
      <h3>Login</h3>
      <Show when={error}>
        <small>{error}</small>
      </Show>
      <form>
        <label for="email">Email address</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email address"
          required
          value={email()}
          onInput={(e) => {
            setEmail(e.currentTarget.value);
          }}
        ></input>
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          required
          value={password()}
          onInput={(e) => {
            setPassword(e.currentTarget.value);
          }}
        ></input>
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            getUserToken();
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
