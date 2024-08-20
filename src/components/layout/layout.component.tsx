import { useMemo } from 'react';

import { Outlet, useLocation } from 'react-router-dom';

import { IMenu } from '@libs/types/menu.type';
import { getTitleCase } from '@libs/utils/string.util';
import { MENUS } from '@constants/menu.constant';

import Sidebar from './sidebar.component';

const Layout = () => {
  const { pathname } = useLocation();

  const title = useMemo(() => {
    const splittedPathname = pathname.slice(1).split('/').slice(-3);
    const action = getTitleCase(splittedPathname[splittedPathname.length - 1]);
    const detailPath = splittedPathname.length > 2 ? splittedPathname[1] : '';
    const currentMenu = MENUS.find((menu: IMenu) => menu.url.slice(1) === splittedPathname[0]);

    const mainTitle = currentMenu?.label || getTitleCase(splittedPathname[0]);

    return `${mainTitle}${detailPath || action ? ' - ' : ''}${action || ''} ${detailPath || ''}`;
  }, [pathname]);

  return (
    <div className="w-full flex">
      <Sidebar />
      <div className="flex-grow p-8">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <main className="py-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
