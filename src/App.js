import Footer from "./components/Footer";
import RouteManager from "./routeManager/RouteManager";

function App() {
  return (
    <div>
      <main className="flex-grow-1">
        <RouteManager />
      </main>

      <Footer />
    </div>
  );
}

export default App;
