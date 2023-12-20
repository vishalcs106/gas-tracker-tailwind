import { useState } from 'react';
import NavLink from 'components/link/NavLink';
import { FiAlignJustify } from 'react-icons/fi';

// Custom components
import dropdownMain from '/public/img/layout/dropdownMain.png';

// Assets
import { GoChevronDown } from 'react-icons/go';
import { IRoute } from 'types/navigation';
import routes from 'routes';

function NavbarAuth(props: {
  onOpenSidenav: () => void;
  sidebarWidth?: any;
  [x: string]: any;
}) {
  const { sidebarWidth, onOpenSidenav, ...rest } = props;
  const [openDashboard, setOpenDashboard] = useState(false);
  const [openNft, setOpenNft] = useState(false);
  const [openMain, setOpenMain] = useState(false);
  const [openAuth, setOpenAuth] = useState(false);

  // menus object
  let authObject = getLinksCollapse('Authentication');
  let mainObject = getLinksCollapse('Main Pages');
  let dashboardsObject = getLinks('Dashboards');
  let nftsObject = getLinks('NFTs');
  // menus links
  function getLinks(routeName: string) {
    let foundRoute = routes.filter(function (route) {
      return route.items && route.name === routeName;
    });
    return foundRoute[0].items;
  }

  function getLinksCollapse(routeName: string) {
    let foundRoute = routes.filter(
      (route) => route.items && route.name === routeName,
    );
    // let foundLinks: { name: string; layout?: string; path: string; component?: () => JSX.Element }[];
    let foundLinks: IRoute[] = [];
    if (foundRoute[0].items) {
      for (let link = 0; link < foundRoute[0].items.length; link++) {
        foundLinks.push(foundRoute[0].items[link]);
      }
      return foundLinks;
    }

    return foundLinks;
  }
  const createDashboardsLinks = (routes: IRoute[]) => {
    return routes.map((link, key) => {
      return (
        <NavLink
          key={key}
          href={link.layout + link.path}
          styles={{ maxWidth: 'max-content' }}
        >
          <p className="text-sm font-medium text-gray-600">{link.name}</p>
        </NavLink>
      );
    });
  };
  const createNftsLinks = (routes: IRoute[]) => {
    return routes.map((link, key) => {
      return (
        <NavLink
          key={key}
          href={link.layout + link.path}
          styles={{ maxWidth: 'max-content' }}
        >
          <p className="text-sm font-medium text-gray-600">{link.name}</p>
        </NavLink>
      );
    });
  };
  const createMainLinks = (routes: IRoute[]) => {
    return routes.map((link, key) => {
      if (link.collapse === true) {
        return (
          <div className="flex w-max flex-col flex-wrap" key={key}>
            <div className="mb-2 flex cursor-default items-center">
              <p className="mr-auto text-sm font-bold uppercase text-navy-700 dark:text-white">
                {link.name}
              </p>
            </div>
            <div className="flex w-max flex-col flex-wrap gap-1 dark:text-white">
              {createMainLinks(link.items)}
            </div>
          </div>
        );
      } else {
        return (
          <NavLink key={key} href={link.layout + link.path}>
            <p className="text-sm text-gray-600">{link.name}</p>
          </NavLink>
        );
      }
    });
  };
  const createAuthLinks = (routes: IRoute[]) => {
    return routes.map((link, key) => {
      if (link.collapse === true) {
        return (
          <div className="flex w-max flex-col flex-wrap" key={key}>
            <div className="mb-1 flex cursor-default items-center">
              <p className="mr-auto text-sm font-bold uppercase text-navy-700 dark:text-white">
                {link.name}
              </p>
            </div>
            <div className="flex flex-col flex-wrap gap-1">
              {createAuthLinks(link.items)}
            </div>
          </div>
        );
      } else {
        return (
          <NavLink key={key} href={link.layout + link.path}>
            <p className="text-sm text-gray-600">{link.name}</p>
          </NavLink>
        );
      }
    });
  };

  return (
    <div
      {...rest}
      className="z-[1] mx-auto flex h-[80px] w-full max-w-screen-xl flex-wrap content-center items-center px-3 xl:items-end"
    >
      {/* horizon logo */}
      <a
        href="/#"
        className="leading-1 content-center self-center font-poppins text-[26px] font-bold uppercase text-white"
      >
        Avalanche <span className="font-medium"> Gas Tracker</span>
      </a>
    </div>
  );
}

export default NavbarAuth;
