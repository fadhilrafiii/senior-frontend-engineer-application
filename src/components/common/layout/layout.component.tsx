import { useMemo } from 'react';

import { Outlet, useLocation } from 'react-router-dom';

import { IMenu } from '@libs/types/menu.type';
import { getTitleCase } from '@libs/utils/string.util';

import { MENUS } from '@constants/menu.constant';

import Sidebar from './sidebar.component';

import './layout.component.scss';

const Layout = () => {
  const { pathname } = useLocation();

  const title = useMemo(() => {
    const splittedPathname = pathname.slice(1).split('/').slice(-3);
    const action =
      splittedPathname.length > 1
        ? getTitleCase(splittedPathname[splittedPathname.length - 1])
        : '';
    const detailPath =
      splittedPathname.length > 2 ? splittedPathname[splittedPathname.length - 2] : '';
    const currentMenu = MENUS.find((menu: IMenu) => menu.url.slice(1) === splittedPathname[0]);

    const mainTitle = currentMenu?.label || getTitleCase(splittedPathname[0]);

    return `${mainTitle}${detailPath || action ? ' - ' : ''}${action || ''} ${detailPath || ''}`;
  }, [pathname]);

  return (
    <div className="w-full flex min-h-[90vh]">
      <Sidebar />
      <div className="flex-grow flex flex-col p-8 pl-[292px] gap-8">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <main className="flex-grow flex flex-col">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
