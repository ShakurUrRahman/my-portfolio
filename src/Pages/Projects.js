import React from "react";
import { products } from "../data";

import "../Styles/Projects.css";
import Product from "../Components/Product";

function Projects() {
  return (
    <div className="projects">
      <h1 className="project-title"> My Personal Projects</h1>
      <div className="pl-list">
        {products.map((item, idx) => (
          <Product key={item.id} item={item} id={idx} />
        ))}
      </div>
    </div>
  );
}

export default Projects;
