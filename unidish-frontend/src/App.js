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
        style={{ marginTop: "100px" }}
        onClick={async () => {
          const res = await checkDBConnection();
          console.log(res);
        }}
      >
        Check DB Connection
      </Button>
    </div>
  );
}

export default App;
