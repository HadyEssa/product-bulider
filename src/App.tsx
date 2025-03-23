import { ChangeEvent, useState } from "react"
import ProductCard from "./components/ProductCard"
import Modal from "./components/ui/Modal"
import { formInputsList, productList } from "./data/data"
import Button from "./components/ui/Button"
import Input from "./components/ui/Input"
import { IProduct } from "./interface"

const App = () => {
  const [product, setProduct] = useState<IProduct>({
    title: "",
    category: {
      name: "",
      imageURL: "",
    },
    price: "",
    description: "",
    color: [],
    imageURL: "",
  });
  const [isOpen, setIsOpen] = useState(true)
  
  const open = () => setIsOpen(true)
  
  const close = () => setIsOpen(false)

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {value, name} = event.target
    setProduct({
      ...product,
      [name]: value,
    });
  }
  const renderProductsList = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));

  const renderFormInputList = formInputsList.map((input) => (
    <div key={input.id} className="flex flex-col">
      <label htmlFor={input.id} className="mb-[2px] text-sm font-medium text-gray-700">
        {input.label}
      </label>
      <Input type="text" id={input.id} name={input.name} value={product[input.name]} onChange={onChangeHandler} /> 
    </div>
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
        <form className="space-y-3">
          {renderFormInputList}
          <div className="flex items-center space-x-2">
            <Button width="w-full" className="bg-green-600 flex-1">
              submit
            </Button>
            <Button width="w-full" className="bg-red-600 flex-1">
              Delete
            </Button>
          </div>
        </form>
      </Modal>
    </main>
  );
}

export default App
