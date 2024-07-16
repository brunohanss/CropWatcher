
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import Home from "./pages/Home";
import { themes } from "./theme";
import { useTheme } from './hooks/useTheme';

function App() {
  // const [greet, setGreetMsg] = useState("");
  // const [name] = useState("");
  const { theme } = useTheme();

  // async function greet() {
  //   // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  //   setGreetMsg(await invoke("greet", { name }));
  // }

  return (
    
    <div className="container">
      <ChakraProvider theme={themes[theme]}>
      {/* <h1>Welcome to Tauri!</h1>

      <div className="row">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>

      <p>{greetMsg}</p> */}
      <Home></Home>
      </ChakraProvider>
      </div>
  );
}

export default App;
