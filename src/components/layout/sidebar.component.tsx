import { Link, useLocation } from 'react-router-dom';

import { IMenu } from '@libs/types/menu.type';
import { MENUS } from '@constants/menu.constant';

const Sidebar = () => {
  const { pathname } = useLocation();
  const basePathname = pathname.slice(1).split('/')?.[0];

  return (
    <aside className="min-h-screen bg-primary w-[260px] flex flex-col py-6">
      <div>
        <h2 className="text-white text-center font-semibold text-xl">Qliniq OS</h2>
      </div>
      <ul className="py-8 px-4">
        {MENUS.map((menu: IMenu) => {
          const isMenuActive = basePathname === menu.url.slice(1).split('/')?.[0];

          return (
            <li key={menu.url} className="flex">
              <Link
                to={menu.url}
                className={`p-4 rounded-md hover:bg-slate-600 transition-all w-full text-white text-medium ${isMenuActive ? 'bg-slate-500 font-medium' : ''}`}
              >
                {menu.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
