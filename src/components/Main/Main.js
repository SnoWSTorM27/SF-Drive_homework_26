import React from "react";

import StartBlockMain from "../StartBlockMain/StartBlockMain";
import logoMain from "./logo_Main.webp";
import logoMainMobile from "./logoMainMobile.webp";
import BlockDescription from "../BlockDescription/BlockDescription";
import logo1 from "./block1_main.webp";
import logo2 from "./block2_main.webp";
import logo3 from "./block3_main.webp";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import cssMain from "./Main.module.css";





function Main () {
    return (
        <>
        <Header />
        <main>
            <StartBlockMain headingBlock = {"Каршеринг в любой точке России"} logo ={ logoMain }/>
            <section  >
                <BlockDescription logo = {logo1} headingBlock="Аренда напрямую от владельцев" textDescription="Вы получите автомобиль от его собственника, а мы проверим юридическую чистоту и техническую исправность."/>
                <BlockDescription logo = {logo2} headingBlock="Автомобили на любой вкус" textDescription="Вы всегда можете подобрать автомобиль любого класса от бюджетных моделей до премиум-класса и спорткаров."/>
                <BlockDescription logo = {logo3} headingBlock="Гарантия честной аренды" textDescription="Общение и оплата происходит через наш сервис, что предотвращает вас от обмана."/>
            </section>
        </main>
        <Footer Copyright="© SkillDrive Inc. 2020" /> 
        </>
    ); 
}

export default Main;