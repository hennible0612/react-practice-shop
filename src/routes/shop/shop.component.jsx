
import {useContext} from "react";
import {ProductsContext} from '../../contexts/products.context'

const Shop = () => {
    const {products} = useContext(ProductsContext) //useContext으로 products context 받아옴

    return (
        <div>
            {products.map(({id, name}) => (
                <div key = {id}>
                    <h1>{name}</h1>
                </div>
            ))}
        </div>
    );
};
export default Shop