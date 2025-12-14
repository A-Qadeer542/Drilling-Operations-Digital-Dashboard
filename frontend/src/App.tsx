import { ApolloProvider } from "@apollo/client";
import { client } from "./graphql/client";
import { Dashboard } from "./pages/Dashboard";
import "./index.css";

export const App = () => (
  <ApolloProvider client={client}>
    <div className="app">
      <header className="header">
        <div className="title">Drilling Operations Dashboard</div>
        <div className="subtitle">Live HMI for well performance</div>
      </header>
      <Dashboard />
    </div>
  </ApolloProvider>
);


