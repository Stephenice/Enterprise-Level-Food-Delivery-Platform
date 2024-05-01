import { MenuItem as MenuItemType } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = {
  menuItem: MenuItemType;
  addToCart: () => void;
};

/**
 * MenuItem component represents a single menu item in a card format.
 * 
 * @param {object} props - The properties passed to the MenuItem component.
 * @param {MenuItemType} props.menuItem - The menu item object containing name and price.
 * @param {Function} props.addToCart - The function to add the item to the cart.
 * @returns {JSX.Element} - JSX element representing the MenuItem component.
 */
const MenuItem = ({ menuItem, addToCart }: Props) => {
  return (
    <Card className="cursor-pointer" onClick={addToCart}>
      <CardHeader>
        <CardTitle>{menuItem.name}</CardTitle>
      </CardHeader>
      <CardContent className="font-bold">
        £{(menuItem.price / 100).toFixed(2)}
      </CardContent>
    </Card>
  );
};

export default MenuItem;
