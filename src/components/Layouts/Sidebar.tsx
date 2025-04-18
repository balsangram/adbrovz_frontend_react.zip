import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { toggleSidebar } from '../../store/themeConfigSlice';
import AnimateHeight from 'react-animate-height';
import { IRootState } from '../../store';
import { useState, useEffect } from 'react';
import IconCaretsDown from '../Icon/IconCaretsDown';
import IconCaretDown from '../Icon/IconCaretDown';
import { FiAward, FiGrid, FiPower, FiUsers } from 'react-icons/fi';
import Logo from '../../assets/logo/favicon.ico';
import IconMinus from '../Icon/IconMinus';

const Sidebar = () => {
    const [currentMenu, setCurrentMenu] = useState<string>('');
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const semidark = useSelector((state: IRootState) => state.themeConfig.semidark);
    const location = useLocation();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const toggleMenu = (value: string) => {
        setCurrentMenu((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };

    useEffect(() => {
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    }, []);

    useEffect(() => {
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(toggleSidebar());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    return (
        <div className={semidark ? 'dark' : ''}>
            <nav
                className={`sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}
            >
                <div className="bg-white dark:bg-black h-full">
                    <div className="flex justify-between items-center px-4 py-3">
                        <NavLink to="/" className="main-logo flex items-center shrink-0 justify-center">
                            <img className="w-8 ml-[5px] flex-none" src={Logo} alt="logo" />
                            <span className="text-2xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle lg:inline dark:text-white-light">{t('ADBROVZ')}</span>
                        </NavLink>

                        <button
                            type="button"
                            className="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <IconCaretsDown className="m-auto rotate-90" />
                        </button>
                    </div>
                    <PerfectScrollbar className="h-[calc(100vh-80px)] relative">
                        <ul className="relative font-semibold space-y-0.5 p-4 py-0">
                            <li className="nav-item">
                                <ul>
                                    <li className="nav-item">
                                        <NavLink to="/" className="group">
                                            <div className="flex items-center gap-2">
                                                <FiGrid className="group-hover:!text-primary shrink-0" />
                                                <span>{t('Dashboard')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    {/* Merchant Management */}
                                    <li className="menu nav-item">
                                        <button type="button" className={`${currentMenu === 'promo' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('promo')}>
                                            <div className="flex items-center gap-2">
                                                <FiAward className="text-xl" />
                                                <span>{t('Promo')}</span>
                                            </div>
                                            <div className={currentMenu !== 'promo' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                <IconCaretDown />
                                            </div>
                                        </button>
                                        <AnimateHeight duration={300} height={currentMenu === 'promo' ? 'auto' : 0}>
                                            <ul className="sub-menu text-gray-500">
                                                <li>
                                                    <NavLink to="/promo/dashboard">{t('Dashboard')}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/promo/advertise-requests">{t('Advertise Requests')}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/promo/draft-advertise-listing">{t('Draft Advertise Listings')}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/promo/support-queries">{t('Support Queries')}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/promo/contents">{t('Contents')}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/promo/deleted-contents">{t('Deleted Contents')}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/promo/listings">{t('Listings')}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/promo/rejected-listings">{t('Rejected Listings')}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/promo/deleted-listings">{t('Deleted Listings')}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/promo/categories">{t('Categories')}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/promo/add-content">{t('Add Content')}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/promo/add-listing">{t('Add Listing')}</NavLink>
                                                </li>
                                                <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                                    <IconMinus className="w-4 h-5 flex-none hidden" />
                                                    <span>{t('interface info')}</span>
                                                </h2>
                                                <li>
                                                    <NavLink to="/promo/help">{t('Help')}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/promo/disclaimer">{t('Disclaimer')}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/promo/faq">{t('FAQ')}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/promo/support">{t('Support')}</NavLink>
                                                </li>
                                                <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                                    <IconMinus className="w-4 h-5 flex-none hidden" />
                                                    <span>{t('Reports')}</span>
                                                </h2>
                                                <li>
                                                    <NavLink to="/promo/coins">{t('Coins')}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/promo/payments">{t('Payments')}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/promo/subscriptions">{t('Subscriptions')}</NavLink>
                                                </li>
                                                <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                                    <IconMinus className="w-4 h-5 flex-none hidden" />
                                                    <span>{t('Settings')}</span>
                                                </h2>
                                                <li>
                                                    <NavLink to="/promo/listing-radius">{t('Listing Radius')}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/promo/advertise-cost">{t('Advertise Cost')}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/promo/support-details">{t('Support Details')}</NavLink>
                                                </li>
                                            </ul>
                                        </AnimateHeight>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </PerfectScrollbar>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
