import { lazy } from 'react';
import AdminProtected from '../components/Protected/AdminProtected';
import Login from '../pages/Login';
import PromoDashboard from '../pages/Admin/Promo/Dashboard';
import AdvertiseRequest from '../pages/Admin/Promo/AdvertiseRequest';
import AddContent from '../pages/Admin/Promo/AddContent';
import Dashboard from '../pages/Admin/Dashboard';
import DraftAdvertiseListings from '../pages/Admin/Promo/DraftAdvertiseListings';
import SupportQueries from '../pages/Admin/Promo/SupportQueries';
import Contents from '../pages/Admin/Promo/Contents';
import DeletedContents from '../pages/Admin/Promo/DeletedContents';
import Listings from '../pages/Admin/Promo/Listings';
import RejectedListings from '../pages/Admin/Promo/RejectedListings';
import DeletedListings from '../pages/Admin/Promo/DeletedListings';
import PromoHelp from '../pages/Admin/Promo/Help';
import PromoDisclaimer from '../pages/Admin/Promo/Disclaimer';
import PromoFAQ from '../pages/Admin/Promo/FAQ';
import PromoSupport from '../pages/Admin/Promo/Support';
import Categories from '../pages/Admin/Promo/Categories';
import SubCategories from '../pages/Admin/Promo/SubCategories';
import EditAdvertiseRequest from '../components/Admin/Promo/AdvertiseRequest/Edit';
const ContactUsBoxed = lazy(() => import('../pages/Pages/ContactUsBoxed'));
const ContactUsCover = lazy(() => import('../pages/Pages/ContactUsCover'));
const ComingSoonBoxed = lazy(() => import('../pages/Pages/ComingSoonBoxed'));
const ComingSoonCover = lazy(() => import('../pages/Pages/ComingSoonCover'));
const Maintenence = lazy(() => import('../pages/Pages/Maintenence'));
const Error = lazy(() => import('../components/Error'));

const routes = [
    // dashboard
    {
        path: '/',
        element: (
            <AdminProtected>
                <Dashboard />
            </AdminProtected>
        ),
    },
    //promo
    {
        path: '/promo/dashboard',
        element: (
            <AdminProtected>
                <PromoDashboard />
            </AdminProtected>
        ),
    },
    {
        path: '/promo/advertise-requests',
        element: (
            <AdminProtected>
                <AdvertiseRequest />
            </AdminProtected>
        ),
    },
    {
        path: '/promo/advertise-requests/edit',
        element: (
            <AdminProtected>
                <EditAdvertiseRequest />
            </AdminProtected>
        ),
    },
    {
        path: '/promo/draft-advertise-listing',
        element: (
            <AdminProtected>
                <DraftAdvertiseListings />
            </AdminProtected>
        ),
    },
    {
        path: '/promo/support-queries',
        element: (
            <AdminProtected>
                <SupportQueries />
            </AdminProtected>
        ),
    },
    {
        path: '/promo/contents',
        element: (
            <AdminProtected>
                <Contents />
            </AdminProtected>
        ),
    },
    {
        path: '/promo/deleted-contents',
        element: (
            <AdminProtected>
                <DeletedContents />
            </AdminProtected>
        ),
    },
    {
        path: '/promo/listings',
        element: (
            <AdminProtected>
                <Listings />
            </AdminProtected>
        ),
    },
    {
        path: '/promo/rejected-listings',
        element: (
            <AdminProtected>
                <RejectedListings />
            </AdminProtected>
        ),
    },
    {
        path: '/promo/deleted-listings',
        element: (
            <AdminProtected>
                <DeletedListings />
            </AdminProtected>
        ),
    },
    {
        path: '/promo/categories',
        element: (
            <AdminProtected>
                <Categories />
            </AdminProtected>
        ),
    },
    {
        path: '/promo/sub-categories',
        element: (
            <AdminProtected>
                <SubCategories />
            </AdminProtected>
        ),
    },
    {
        path: '/promo/add-content',
        element: (
            <AdminProtected>
                <AddContent />
            </AdminProtected>
        ),
    },
    {
        path: '/promo/add-listing',
        element: (
            <AdminProtected>
                <div>hi</div>
            </AdminProtected>
        ),
    },
    {
        path: '/promo/help',
        element: (
            <AdminProtected>
                <PromoHelp />
            </AdminProtected>
        ),
    },
    {
        path: '/promo/disclaimer',
        element: (
            <AdminProtected>
                <PromoDisclaimer />
            </AdminProtected>
        ),
    },
    {
        path: '/promo/faq',
        element: (
            <AdminProtected>
                <PromoFAQ />
            </AdminProtected>
        ),
    },
    {
        path: '/promo/support',
        element: (
            <AdminProtected>
                <PromoSupport />
            </AdminProtected>
        ),
    },
    {
        path: '/promo/coins',
        element: (
            <AdminProtected>
                <div>hi</div>
            </AdminProtected>
        ),
    },
    {
        path: '/promo/payments',
        element: (
            <AdminProtected>
                <div>hi</div>
            </AdminProtected>
        ),
    },
    {
        path: '/promo/subscriptions',
        element: (
            <AdminProtected>
                <div>hi</div>
            </AdminProtected>
        ),
    },
    {
        path: '/promo/listing-radius',
        element: (
            <AdminProtected>
                <div>hi</div>
            </AdminProtected>
        ),
    },
    {
        path: '/promo/advertise-cost',
        element: (
            <AdminProtected>
                <div>hi</div>
            </AdminProtected>
        ),
    },
    {
        path: '/promo/support-details',
        element: (
            <AdminProtected>
                <div>hi</div>
            </AdminProtected>
        ),
    },
    // pages
    {
        path: '/pages/contact-us-boxed',
        element: <ContactUsBoxed />,
        layout: 'blank',
    },
    {
        path: '/pages/contact-us-cover',
        element: <ContactUsCover />,
        layout: 'blank',
    },
    {
        path: '/pages/coming-soon-boxed',
        element: <ComingSoonBoxed />,
        layout: 'blank',
    },
    {
        path: '/pages/coming-soon-cover',
        element: <ComingSoonCover />,
        layout: 'blank',
    },
    {
        path: '/pages/maintenence',
        element: <Maintenence />,
        layout: 'blank',
    },
    {
        path: '/login',
        element: <Login />,
        layout: 'blank',
    },
    {
        path: '*',
        element: <Error />,
        layout: 'blank',
    },
];

export { routes };
