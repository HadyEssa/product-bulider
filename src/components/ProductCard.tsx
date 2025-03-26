import { tsxsclise } from "../utils/function";
import CircleColor from "./CircleColor";
import Image from "./Image";
import Button from "./ui/Button";

interface IProps {
product:Iproduct;
}

const ProductCard = ({product}: IProps) => {
  const {title, imageURL , description,colors} = product;
  const renderProductColors = colors.map((color) => (
    <CircleColor key={color} color={color} />
  ));
  return (
    <div className="max-w-sm md:max-w-lg mx-auto md:mx-0 border rounded-md p-2 flex flex-col space-y-3">
        <Image
          imageURL={imageURL}
          alt="product name"
          className="rounded-md h-52 w-full lg:object-cover"
        />
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-neutral-700">{tsxsclise(description)}</p>
      <div className="flex items-center flex-wrap space-x-1">
          {renderProductColors}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold text-bold">${product.price}</span>
        <Image
          imageURL={imageURL}
          alt="product name"
          className="w-10 h-10 rounded-full"
        />
      </div>
      <div className="flex items-center justify-between space-x-2 mt-5">
        <Button className="bg-blue-700 flex-1">Edit</Button>
        <Button className="bg-red-700 flex-1 ">Delete</Button>
      </div>
    </div>
  );
}

export default ProductCard;