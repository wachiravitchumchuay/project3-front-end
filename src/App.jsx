import { useState } from "react";
import { AppProvider } from "./context/AppContext";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SignUpForm from "@/components/ui/SignUpForm";
import SignInForm from "@/components/ui/SignInForm";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import CarouselPage from "./pages/CarouselPage";
import FormHomePage from "./pages/FormHomePage";
import { Toaster } from "sonner";
import { toast } from "sonner";

//TODO: change website to running
function App() {
  const [activeTab, setActiveTab] = useState("/HomePage");
  const [login, setLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);

  return (
    <AppProvider>
      <Toaster richColors position="top-center" />
      <div className="font-body ">
        <div className="bg-green-2 text-white min-h-[50vh] ">
          <div className="pl-24">
            <div className="flex justify-between">
              <TabsNavigation
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
              <div className="flex mr-24">
                <Dialog
                  open={loginDialogOpen}
                  onOpenChange={setLoginDialogOpen}
                >
                  {login && (
                    <div className="flex items-center">
                      <div className="text-xl">{username}</div>
                    </div>
                  )}
                  <DialogTrigger asChild>
                    {!login && (
                      <Button
                        variant="ghost"
                        size="lg"
                        className="text-lg hover:bg-green-3 hover:text-white"
                      >
                        Sign in
                      </Button>
                    )}
                  </DialogTrigger>
                  {login && (
                    <Button
                      variant="ghost"
                      size="lg"
                      className="text-lg hover:bg-green-3 hover:text-white"
                      onClick={() => {
                        setLogin(false);
                        toast.success("Sign Out Successful");
                      }}
                    >
                      Sign out
                    </Button>
                  )}

                  <DialogContent className="min-w-lg">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold">
                        Login to your account
                      </DialogTitle>
                      <DialogDescription />
                    </DialogHeader>
                    <div className="flex flex-1 items-center justify-center">
                      <SignInForm
                        onSuccess={(usr) => {
                          setLogin(true),
                            setLoginDialogOpen(false),
                            setUsername(usr);
                        }}
                      />
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="lg"
                      className=" bg-green-2 ml-2 text-lg hover:bg-green-3 hover:text-white"
                    >
                      Sign up
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Share link</DialogTitle>
                      <DialogDescription>
                        Anyone who has this link will be able to view this.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center space-x-2">
                      <div className="grid flex-1 gap-2">
                        <SignUpForm />
                      </div>
                    </div>
                    <DialogFooter className="sm:justify-start">
                      <DialogClose asChild>
                        <Button type="button" variant="secondary">
                          Close
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div>
              {activeTab === "/HomePage" && <HomePage />}
              {activeTab === "/AboutPage" && <AboutPage />}
            </div>
          </div>
        </div>
        <div>
          <CarouselPage />
          <FormHomePage />
        </div>
      </div>
    </AppProvider>
  );
}

const TabsNavigation = ({ activeTab, setActiveTab }) => {
  return (
    <Tabs
      value={activeTab}
      className="w-full px-4"
      onValueChange={(value) => setActiveTab(value)}
    >
      <TabsList className="bg-green-2">
        <TabsTrigger
          value="/HomePage"
          className="w-64 px-4 py-2 text-lg data-[state=active]:bg-green-3 data-[state=active]:text-white data-[state=inactive]:text-gray-300"
        >
          Home
        </TabsTrigger>
        <TabsTrigger
          value="/AboutPage"
          className="w-64 px-4 py-2 text-lg data-[state=active]:bg-green-3 data-[state=active]:text-white data-[state=inactive]:text-gray-300"
        >
          About
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default App;
