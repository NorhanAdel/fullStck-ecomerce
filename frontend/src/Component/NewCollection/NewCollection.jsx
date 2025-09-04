import React, { useEffect, useState } from "react";
import "./NewCollection.css";
import Collection from "../../Assets/new_collections";
import { Items } from "../Items/Items";
export const NewCollection = () => {
  const [newCollection, setnewCollection] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/newCollection").then((res) =>
      res.json().then((data) => setnewCollection(data))
    );
  }, []);
  return (
    <div className="newcollection">
      <h1>NEW COLLECTION</h1>
      <hr />
      <div className="collections">
        {Collection.map((item, i) => {
          return (
            <Items
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};
