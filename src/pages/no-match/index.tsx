import React from "react";
import { Link } from "react-router-dom";

export function NoMatch() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <h1 className="mt-4 text-4xl">404</h1>
      <Link to={"/"} className="mt-4">
        <h1 className="text-xl">🤠</h1>
      </Link>
    </div>
  );
}
