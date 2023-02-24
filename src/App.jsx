import './App.css';
import HtmlRenderer from './components/HtmlRenderer';
import { AppContextProvider } from './App.context';

function App() {
  return (
    <div className="App">
      <AppContextProvider ><HtmlRenderer /></AppContextProvider>

    </div>
  );
}

export default App;
