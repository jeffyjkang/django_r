import { Outlet } from 'react-router-dom';
import { AppContext } from '../../App';
import './layout.css';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function Layout(props) {
  return (
    <div className='container'>
      <Navbar />
      <Sidebar />
      <section className='content'>
        <AppContext.Provider value={props.appState}>
          <Outlet />
        </AppContext.Provider>
      </section>
    </div>
  )
}
