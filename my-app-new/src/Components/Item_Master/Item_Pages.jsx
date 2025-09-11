import Item_header from "./Item_header";
import Item_list from "./Item_list";
import Navbar from "../Customer_Master/Navbar";
import ItemProvider from "../../Store/Item-store";

const Item_Pages = () => {
  return (
    <ItemProvider>
      <div>
        <Navbar />
        <Item_header />
        <Item_list />
      </div>
    </ItemProvider>
  );
};
export default Item_Pages;
