import { IntlProvider } from "react-intl"
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"

import { Step1 as NStep1 } from "@/pages/web/step1"
import { Step2 as NStep2 } from "@/pages/web/step2"
import { Step3 as NStep3 } from "@/pages/web/step3"

import Header from "./components/header"
import Steps from "./components/steps"
import { useLanguage } from "./context/useLanguage"
import { messages } from "./lib/intl"
import { Congrat } from "./pages/desktop/Congrat"
import { Step1 } from "./pages/desktop/Step1"
import { Step2 } from "./pages/desktop/Step2"
import { Step3 } from "./pages/desktop/Step3"
import { Test } from "./pages/test"

const router = createBrowserRouter([
  {
    path: "/",
    Component: () => (
      <div className="flex h-full w-screen grow flex-col bg-[url('/image/bg.jpg')] bg-cover">
        <Header />
        <Steps />
        <div className="m-auto flex h-full w-[1300px] max-w-full grow  gap-5 p-5">
          <Outlet />
        </div>
      </div>
    ),
    children: [
      {
        path: "step1",
        element: <Step1 />,
      },
      {
        path: "step2",
        element: <Step2 />,
      },
      {
        path: "step3",
        element: <Step3 />,
      },
      {
        path: "s1",
        element: <NStep1 />,
      },
      {
        path: "s2",
        element: <NStep2 />,
      },
      {
        path: "s3",
        element: <NStep3 />,
      },
    ],
  },
  {
    path: "congrat",
    Component: () => (
      <div className="flex h-full w-screen grow flex-col bg-[url('/image/congrat.jpeg')] bg-cover">
        <Header />
        <Steps />
        <div className="flex h-full grow gap-5 p-5 ">
          <Congrat />
        </div>
      </div>
    ),
  },
  {
    path: "test",
    Component: Test,
  },
])

export default function App() {
  const language = useLanguage((state) => state.language)

  return (
    <div
      style={{ direction: language === "ar" ? "rtl" : "ltr" }}
      className=" flex min-h-screen flex-col "
    >
      <IntlProvider
        locale={language}
        defaultLocale="en"
        messages={messages[language]}
      >
        <RouterProvider router={router} />
      </IntlProvider>
    </div>
  )
}
