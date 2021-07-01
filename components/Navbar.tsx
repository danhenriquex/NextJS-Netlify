import Link from "next/link";
import Image from "next/image";
import { useAuth } from "../stores/authContext";

export default function Navbar() {
  const { user, Login, Logout, authReady } = useAuth();

  return (
    <div className="container">
      <nav>
        <Image src="/rupee.png" width={50} height={48} />
        <h1>Gaming Vibes</h1>
        {authReady && (
          <ul>
            <li>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li>
              <Link href="/guides">
                <a>Guides</a>
              </Link>
            </li>
            {!user && (
              <li onClick={Login} className="btn">
                Login/Signup
              </li>
            )}
            {user && <li>{user.email}</li>}
            {user && (
              <li onClick={Logout} className="btn">
                Logout
              </li>
            )}
          </ul>
        )}
      </nav>
      <div className="banner">
        <Image src="/banner.png" width={966} height={276} />
      </div>
    </div>
  );
}
