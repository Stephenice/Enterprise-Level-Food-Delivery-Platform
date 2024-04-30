import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";


type Props = {
        children: React.ReactNode;
        showHero?: boolean;
};

/**
 * Layout component serves as the main layout structure for the application.
 * It includes a header, optional hero section, main content area, and footer.
 * 
 * @param children - The child components to be rendered within the layout.
 * @param showHero - A boolean value indicating whether to display the hero section (default: false).
 * @returns {JSX.Element} - JSX representing the layout structure.
 */
function Layout({children, showHero = false}:Props) {
  return (
    <div className="flex flex-col min-h-screen">
        <Header />
        {showHero && <Hero />}
        <div  className="container mx-auto flex-1 py-10">{children}</div>
        <Footer/>
      
    </div>
  )
}


export default Layout

