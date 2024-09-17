import { useContext } from "react";
import Toogle from "./Toogle";
import { ToogleListContext } from "../Store/toogle-list-store";

const ToogleList = () => {
  const { FAQList } = useContext(ToogleListContext);
  return (
    <>
      {FAQList.map((item) => (
        <Toogle item={item}></Toogle>
      ))}
    </>
  );
};
export default ToogleList;
