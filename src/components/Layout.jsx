import { useOutlet } from "react-router-dom";
import Header from "./Layout/Header.jsx"
import Footer from "./Layout/Footer.jsx"


export default function Layout() {
    const outlet = useOutlet();

    return (
        <>
            <Header></Header>
            {outlet}
            <Footer></Footer>
        </>
    )
}