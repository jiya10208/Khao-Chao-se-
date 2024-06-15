import { useEffect } from "react";
import { useState } from "react";
import MealItem from "./MealItem";
import useHttp from "../hooks/UseHttp";
import Error from "./Error";

const requestConfig = {};

const url = "http://localhost:3000/meals";
export default function Meals() {
  console.log("url in meals", url);
  const { loading, data, error } = useHttp(url, requestConfig, []);
  if (error) {
    return <Error title="Failed to fetch meals" message={error} />;
  }
  if (loading) {
    return <p className="center">Fetching Meals...</p>;
  }
  return (
    <ul id="meals">
      {data && data.map((meal) => <MealItem meal={meal} key={meal.id} />)}
    </ul>
  );
}
