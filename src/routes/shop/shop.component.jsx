import {useContext} from "react";
import {ProductsContext} from '../../contexts/products.context'
import ProductCard from '../../components/product-card/product-card.component'
import './shop.styles.scss'

const Shop = () => {
    const {products} = useContext(ProductsContext) //useContext으로 products context 받아옴

    return (
        <div className='products-container'>
            {products.map((product) => (
                <ProductCard key={product.id} product={product}/> //각 product ProductCard로 보내줌
            ))}
        </div>
    );
};
export default Shop