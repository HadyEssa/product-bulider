import { v4 as uuid } from "uuid";
import { ChangeEvent, FormEvent, useState } from "react"
import ProductCard from "./components/ProductCard"
import Modal from "./components/ui/Modal"
import { colors, formInputsList, productList } from "./data/data"
import Button from "./components/ui/Button"
import Input from "./components/ui/Input"
import { IProduct } from "./interface"
import { productValidation } from "./validation"
import ErrorMessage from "./components/ErrorMessage"
import CircleColor from "./components/CircleColor"
import Select from "./components/ui/Select";

const App = () => {
  const deufaltProductObj={
    title: "",
    price: "",
    description: "",
    colors: [],
    imageURL: "",
    category: {
      name: "",
      imageURL: "",
    },
  };
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [product, setProduct] = useState<IProduct>(deufaltProductObj);
  const [isOpen, setIsOpen] = useState(false);
  const [tempColors, setTempColor] = useState<string[]>([]);
  const [errors, setErrors] = useState({ title: "", description: "", imageURL: "", price: "" });
  // console.log(tempColors)
  const open = () => setIsOpen(true)
  
  const close = () => setIsOpen(false)

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {value, name} = event.target
    setProduct({
      ...product,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]:""
    })
  }
  
  const onCancel=()=>{
    setProduct(deufaltProductObj);
    close();
  }
  const Submithandelr=(e: FormEvent<HTMLFormElement>):void=>{
    e.preventDefault();
    const { title, description, price, imageURL } = product;
    const errors = productValidation({
      title,
      description,
      price,
      imageURL
    })
    console.log(errors);   
    const hasErrorMsg =
    Object.values(errors).some(value => value === "") && Object.values(errors).every(value => value === "");
    
    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }
    setProducts(prev => [{ ...product, id: uuid(), colors: tempColors }, ...prev]);
    setProduct(deufaltProductObj);
    setTempColor([]);
    close();
  }
  const renderProductsList = products.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));

  const renderFormInputList = formInputsList.map((input) => (
    <div key={product.id} className="flex flex-col">
      <label
        htmlFor={input.id}
        className="mb-[2px] text-sm font-medium text-gray-700"
      >
        {input.label}
      </label>
      <Input
        type="text"
        id={input.id}
        name={input.name}
        value={product[input.name]}
        onChange={onChangeHandler}
      />
      <ErrorMessage msg={errors[input.name]} />
    </div>
  ));

  const renderProductColors = colors.map((color) => (
    <CircleColor color={color} key={color} onClick={() => {
        if (tempColors.includes(color)) {
          setTempColor(prev => prev.filter(item => item !== color));
          return;
        }
        setTempColor(prev=>[...prev,color])}} />
  ));
  return (
    <main className="container">
      <Button
        className="block bg-purple-700 hover:bg-indigo-800 mx-auto my-10 px-10 font-medium"
        onClick={open}
        width="w-fit"
      >
        Build a Product
      </Button>

      <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 p-2 rounded-md">
        {renderProductsList}
      </div>

      <Modal IsOpen={isOpen} close={close} title="Add New product">
        <form className="space-y-3" onSubmit={Submithandelr}>
          {renderFormInputList}
          <div className="flex items-center flex-wrap space-x-1">
            {renderProductColors}
          </div>
          <div className="flex items-center flex-wrap space-x-1">
            {tempColors.map((color) => (
              <span
                key={color}
                className="p-1 mr-1 mb-1 text-xs rounded-md text-white"
                style={{ backgroundColor: color }}
              >
                {color}
              </span>
            ))}
          </div>
            <Select/>
          <div className="flex items-center space-x-2">
            <Button width="w-full" className="bg-green-600 flex-1">
              submit
            </Button>
            <Button
              width="w-full"
              className="bg-red-600 flex-1"
              onClick={onCancel}
            >
              Delete
            </Button>
          </div>
        </form>
      </Modal>
    </main>
  );
}

export default App
