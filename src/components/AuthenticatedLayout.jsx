import React from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { UserButton, useClerk, useUser } from "@clerk/clerk-react";
import { useTranslation } from "react-i18next";
import {
  FiFileText,
  FiHome,
  FiLogOut,
  FiUser,
  FiBell,
  FiActivity,
  FiSettings,
  FiClipboard,
} from "react-icons/fi";

const AuthenticatedLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "fa";
  const { signOut } = useClerk();
  const { user } = useUser();
  const navItems = [
    { to: "/dashboard", label: t("app.layout.nav.dashboard"), icon: FiHome },
    {
      to: "/applications",
      label: t("app.layout.nav.applications"),
      icon: FiClipboard,
    },
    { to: "/monitor", label: t("app.layout.nav.monitor"), icon: FiActivity },
    { to: "/profile", label: t("app.layout.nav.profile"), icon: FiUser },
    {
      to: "/notifications",
      label: t("app.layout.nav.notifications"),
      icon: FiBell,
    },
    { to: "/settings", label: t("app.layout.nav.settings"), icon: FiSettings },
    { to: "/form", label: t("app.layout.nav.form"), icon: FiFileText },
  ];

  const mobileTabs = [
    { to: "/dashboard", label: t("app.layout.mobile.home"), icon: FiHome },
    {
      to: "/applications",
      label: t("app.layout.mobile.applications"),
      icon: FiClipboard,
    },
    { to: "/monitor", label: t("app.layout.mobile.monitor"), icon: FiActivity },
    {
      to: "/notifications",
      label: t("app.layout.mobile.notifications"),
      icon: FiBell,
    },
    { to: "/profile", label: t("app.layout.mobile.profile"), icon: FiUser },
  ];

  const pageTitles = {
    "/dashboard": t("app.layout.pageTitles.dashboard"),
    "/applications": t("app.layout.pageTitles.applications"),
    "/monitor": t("app.layout.pageTitles.monitor"),
    "/profile": t("app.layout.pageTitles.profile"),
    "/notifications": t("app.layout.pageTitles.notifications"),
    "/settings": t("app.layout.pageTitles.settings"),
    "/form": t("app.layout.pageTitles.form"),
  };
  const currentPageTitle =
    pageTitles[location.pathname] || t("app.layout.pageTitles.default");

  const displayName =
    user?.fullName ||
    user?.primaryEmailAddress?.emailAddress ||
    t("app.layout.accountFallback");
  const email = user?.primaryEmailAddress?.emailAddress;

  const handleSignOut = async () => {
    await signOut();
    navigate("/login", { replace: true });
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold transition ${
      isActive
        ? "bg-white text-blue-700 shadow-sm"
        : "text-slate-100 hover:bg-white/15 hover:text-white"
    }`;

  const sidebarPositionClass = isRTL ? "right-0 border-l" : "left-0 border-r";
  const mainMarginClass = isRTL ? "md:mr-72" : "md:ml-72";

  return (
    <div className="min-h-screen bg-[#F5FEFF]" dir={isRTL ? "rtl" : "ltr"}>
      <aside
        className={`fixed bottom-0 top-0 hidden w-72 flex-col bg-slate-900/80 px-5 py-6 text-white shadow-2xl backdrop-blur md:flex ${sidebarPositionClass}`}
      >
        <Link to="/dashboard" className="mb-8 block">
          <div className="text-xs font-semibold uppercase tracking-wide text-cyan-200">
            VisaSync
          </div>
          <div className="mt-1 text-xl font-black">
            {t("app.layout.portalTitle")}
          </div>
        </Link>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink key={item.to} to={item.to} className={navLinkClass}>
                <Icon className="h-5 w-5" aria-hidden="true" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-white/15 pt-5">
          <div className="mb-4 flex items-center gap-3">
            <UserButton
              afterSignOutUrl="/login"
              appearance={{
                elements: {
                  avatarBox: "h-10 w-10",
                },
              }}
            />
            <div className="min-w-0">
              <div className="truncate text-sm font-bold">{displayName}</div>
              {email && (
                <div className="truncate text-xs text-slate-300" dir="ltr">
                  {email}
                </div>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={handleSignOut}
            className="flex w-full items-center justify-center gap-2 rounded-md border border-white/20 px-3 py-2 text-sm font-semibold text-slate-100 transition hover:bg-white hover:text-blue-700"
          >
            <FiLogOut className="h-5 w-5" aria-hidden="true" />
            {t("app.layout.signOut")}
          </button>
        </div>
      </aside>

      <header className="sticky top-0 z-30 border-b border-white/20 bg-slate-900/85 px-4 py-3 text-white shadow-lg backdrop-blur md:hidden">
        <div className="flex items-center justify-between gap-3">
          <Link to="/dashboard" className="min-w-0">
            <div className="truncate text-sm font-black">
              {currentPageTitle}
            </div>
            {email && (
              <div className="truncate text-xs text-slate-300" dir="ltr">
                {email}
              </div>
            )}
          </Link>
          <div className="flex items-center gap-3">
            <UserButton afterSignOutUrl="/login" />
            <button
              type="button"
              onClick={handleSignOut}
              className="rounded-md border border-white/20 p-2 text-slate-100 transition hover:bg-white hover:text-blue-700"
              aria-label={t("app.layout.signOut")}
            >
              <FiLogOut className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <main className={mainMarginClass}>
        <div className="mx-auto min-h-screen max-w-7xl px-1 pb-24 pt-4 md:px-6 md:py-8">
          <div className="mb-4 hidden items-center justify-between md:flex">
            <div>
              <h1 className="text-2xl font-black text-[#0D3B42]">
                {currentPageTitle}
              </h1>
              <p className="mt-1 text-sm text-[#1A6370]">
                {t("app.layout.subtitle")}
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-md border border-[#00B8C833] bg-white px-3 py-2 text-sm font-semibold text-[#1A6370]">
              <FiBell className="h-5 w-5" aria-hidden="true" />
              <span>{t("app.layout.newNotifications", { count: 3 })}</span>
            </div>
          </div>
          {children}
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-[#00B8C833] bg-white/95 px-2 py-2 backdrop-blur md:hidden">
        {mobileTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = location.pathname === tab.to;

          return (
            <NavLink
              key={tab.to}
              to={tab.to}
              className={`flex min-w-[58px] flex-col items-center rounded-[10px] px-2 py-1 text-[11px] font-bold ${
                isActive ? "text-[#007A8A]" : "text-[#6B9EA6]"
              }`}
            >
              <Icon className="mb-1 h-4 w-4" aria-hidden="true" />
              <span>{tab.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export default AuthenticatedLayout;
