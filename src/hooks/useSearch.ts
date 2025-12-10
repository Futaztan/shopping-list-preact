import { useState } from "preact/hooks";
import { Item } from "../types/Item";


export function useSearch(items: Item[], setItems: (value: Item[]) => void) {
  const [searchedAttribute, setSearchedAttribute] = useState("Név")
  const [searchedText, setSearchedText] = useState("")
  const [searchOperator, setSearchOperator] = useState("=");

  const [isFiltered, setIsFiltered] = useState(false)

  function search(attribute: string, input: string) {

    if (!input) setIsFiltered(false)
    else setIsFiltered(true)
    switch (attribute) {
      case "Név":
        {
          const newList = items.map(item => {
            let isMatch = false;
            isMatch = item.name.toLowerCase().includes(input.toLowerCase())
            return { ...item, hidden: !isMatch };
          });
          setItems(newList)

        }

        break;

      case "Egységár":
        {
          const inputNumber = Number(input);
          const newList = items.map(item => {
            let isMatch = false;

            switch (searchOperator) {
              case "<":
                isMatch = item.price < inputNumber;
                break;
              case "=":
                isMatch = item.price === inputNumber;
                break;
              case ">":
                isMatch = item.price > inputNumber;
                break;

            }

            return { ...item, hidden: !isMatch };
          });
          setItems(newList)
        }

        break;

      case "Kategória":
        {
          const newList = items.map(item => {
            let isMatch = false;
            isMatch = item.category.toLowerCase().includes(input.toLowerCase())
            return { ...item, hidden: !isMatch };
          });
          setItems(newList)

        }
        break;

      case "Ár":
        {
          const inputNumber = Number(input);
          const newList = items.map(item => {
            let isMatch = false;

            switch (searchOperator) {
              case "<":
                isMatch = item.price * item.quantity < inputNumber;
                break;
              case "=":
                isMatch = item.price * item.quantity === inputNumber;
                break;
              case ">":
                isMatch = item.price * item.quantity > inputNumber;
                break;

            }

            return { ...item, hidden: !isMatch };
          });
          setItems(newList)
        }

        break;


      default: throw new Error("error");

    }

  }
  return {
    searchedAttribute,
    setSearchedAttribute,
    searchedText,
    setSearchedText,
    searchOperator,
    setSearchOperator,
    isFiltered,
    search
  }
}