import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isClick, setIsClick] = useState(true);
  const [jokes, setJokes] = useState([]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (username === "maruthi" && password === "maruthi2024") {
      try {
        fetch(
          "https://v2.jokeapi.dev/joke/any?format=json&blacklistFlags=nsfw,sexist&type=single&lang=EN&amount=10"
        )
          .then((response) => response.json())
          .then((data) => {
            if (data && data.jokes) {
              setJokes(data.jokes);
              setIsClick(false);
            }
          });
      } catch (error) {
        console.error("Error fetching jokes:", error);
      }
    } else {
      alert("Invalid username and password");
    }
  };

  return (
    <div>
      {isClick ? (
        <div className="bg-container">
          <h1 className="heading">Login</h1>
          <form className="form-group container" onSubmit={handleLogin}>
            <div className="input-container">
              <label htmlFor="username" className="form-label">
                UserName
              </label>
              <input
                id="username"
                className="form-control input"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                className="form-control input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
          <p className="para">
            Username: <span className="names">maruthi</span>
          </p>
          <p className="para">
            Password: <span className="names">maruthi2024</span>
          </p>
        </div>
      ) : (
        <table className="table table-striped table-hover table-container">
          <thead className="table-dark">
            <tr>
              <th className="head">Jokes</th>
            </tr>
          </thead>
          <tbody>
            {jokes.map((joke, index) => (
              <tr key={index}>
                <td>{joke.joke}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default App;
