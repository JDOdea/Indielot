import AuthProvider from "./AuthContext";
import ProductionProvider from "./ProductionContext";

export default function Context({ children }) {
    return (
        <AuthProvider>
            <ProductionProvider>
                {children}
            </ProductionProvider>
        </AuthProvider>
    )
}