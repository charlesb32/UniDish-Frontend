import logo from "./logo.svg";
import "./App.css";
import { checkDBConnection } from "./Axios/APICalls";
import Button from "@mui/material/Button";

function App() {
  return (
    <div className="App">
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: "300px" }}
        onClick={async () => {
          const res = await checkDBConnection();
          console.log(res);
          alert(
            "Connection successful to db! The first dining hall if represented in a table as: \n" +
              res.data
          );
        }}
      >
        Check DB Connection
      </Button>
    </div>
  );
}

export default App;
