import HomePage from "../components/home";
import Main from "../components/posts";
import Navbar from "../components/navbar";
import Footer from "../components/footer";



export default function Home() {
  return (
    <div>
      <Navbar/>
      <HomePage />
      <Main />
      <Footer />
    </div>
  );
}
