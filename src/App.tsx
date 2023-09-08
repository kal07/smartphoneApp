import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { IntlProvider } from "react-intl"
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"

import Header from "./components/header"
import Steps from "./components/steps"
import { useLanguage } from "./context/useLanguage"
import { messages } from "./lib/intl"
import { Congrat } from "./pages/desktop/Congrat"
import { Step1 } from "./pages/desktop/Step1"
import { Step1TakePhoto } from "./pages/desktop/Step1.takePhoto"
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
        path: "desktop/photo/:price_id/:country_destination",
        element: <Step1 />,
      },
      { path: "service/qrCodeCheck/:qrcode_id", element: <Step1TakePhoto /> },
      {
        path: "desktop/photo/:price_id/:country_destination/:qrcode_uid/step2",
        element: <Step2 />,
      },
      {
        path: "desktop/photo/:price_id/:country_destination/:qrcode_uid/step3",
        element: <Step3 />,
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchInterval: 1000 * 60 * 60,
      staleTime: 1000 * 60 * 60,
    },
  },
})

export default function App() {
  const language = useLanguage((state) => state.language)

  return (
    <div
      style={{ direction: language === "ar" ? "rtl" : "ltr" }}
      className=" flex min-h-screen flex-col "
    >
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}

        <IntlProvider
          locale={language}
          defaultLocale="en"
          messages={messages[language]}
        >
          <RouterProvider router={router} />
        </IntlProvider>
      </QueryClientProvider>
    </div>
  )
}
