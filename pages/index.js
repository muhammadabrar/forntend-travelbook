import HomePage from "../components/home";
import Main from "../components/posts";
import Navbar from "../components/navbar";



export default function Home() {
  return (
    <div>
      <Navbar/>
      <HomePage />
      <Main />
    </div>
  );
}
