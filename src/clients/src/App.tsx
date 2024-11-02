import React from "react";
import logo from "./logo.svg";
// import "./App.css";
import { Button } from "./components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          HELOO!
        </a>
      </header>
      <h1 className="text-5xl">asdlkjfasdf</h1>
      <Button variant={"default"}>asdfasdljfaskjdlhflkjshdlkjahsdfkjh</Button>
    </div>
  );
}

export default App;
