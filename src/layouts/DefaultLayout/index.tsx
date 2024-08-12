import { Outlet } from "react-router-dom";
import { Header } from "../../Components/Header";

import { LayoutuContainer } from "./styles";

export function DefaultLayout(){
    return (
        <LayoutuContainer>
            <Header />
            <Outlet />
        </LayoutuContainer>
    )
}