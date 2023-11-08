import UserProvider from "./AuthContext";
import ProductionProvider from "./ProductionContext";

export default function Context({ children }) {

    return (
        <UserProvider>
            <ProductionProvider>
                {children}
            </ProductionProvider>
        </UserProvider>
    )
}