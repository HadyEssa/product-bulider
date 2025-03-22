import { useState } from "react"
import ProductCard from "./components/ProductCard"
import Modal from "./components/ui/Modal"
import { formInputsList, productList } from "./data/data"
import Button from "./components/ui/Button"
import Input from "./components/ui/Input"

const App = () => {

  const [isOpen, setIsOpen] = useState(true)
  
  function open() {
    setIsOpen(true)
  }
  
  function close() {
    setIsOpen(false)
  }

  const renderProductsList = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ))
  const renderFormInputList = formInputsList.map((input) => (
    <div className="flex flex-col">
        <label htmlFor={input.id} className="mb-[2px] text-sm font-medium text-gray-700">
          {input.label}
        </label>
        <Input type="text" id={input.id} name={input.name}  /> 
      </div>
  ));
  return (
    <main className="container">
      <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 p-2 rounded-md">
        {renderProductsList}
      </div>
      <Modal IsOpen={isOpen} close={close} title="Add New product">
        <form className="space-y-3">
          {renderFormInputList}
          <div className="flex items-center space-x-2">
            <Button
              width="w-full"
              className="bg-black hover:bg-green-600 flex-1"
            >
              submit
            </Button>
            <Button
              width="w-full"
              className="bg-gray-700 hover:bg-red-600 flex-1"
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
