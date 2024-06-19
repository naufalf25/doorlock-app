import Nav from './Nav';
import Navbar from './Navbar';

export default function Layout({ children, title, uid, path }) {
  return (
    <>
      <Navbar title={title} uid={uid} />
      {children}
      <Nav path={path} />
    </>
  );
}
