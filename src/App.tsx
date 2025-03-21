import ProductCard from "./components/ProductCard"
import { productList } from "./data/data"

const App = () => {
  const renderProductsList = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ))
  return (
    <main className="container">
      <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 p-2 rounded-md">
        {renderProductsList}
      </div>
    </main>
  )
}

export default App
