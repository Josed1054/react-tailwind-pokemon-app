import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavBar } from "../../components/nav-bar";
import { Home } from "../../pages/home";
import { NoMatch } from "../../pages/no-match";
import { Pokemon } from "../../pages/pokemon";
import { Pokemons } from "../../pages/pokemons";
import { Search } from "../../pages/search";

export function ROUTES() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Home />} />
          <Route path="pokemons" element={<Pokemons />} />
          <Route path="pokemon/:ID" element={<Pokemon />} />
          <Route path="search/:ID" element={<Search />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </Router>
  );
}
