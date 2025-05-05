import { useState } from "react";
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
import { useAppContext } from "@/context/AppContext";
function App() {
  const [activeTab, setActiveTab] = useState("/HomePage");

  const [signInDialogOpen, setSignInDialogOpen] = useState(false);
  const [signUpDialogOpen, setSignUpDialogOpen] = useState(false);
  const { signIn, setSignIn, userData, setUserData } = useAppContext();
  return (
    <div>
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
                  open={signInDialogOpen}
                  onOpenChange={setSignInDialogOpen}
                >
                  {signIn && (
                    <div className="flex items-center">
                      <div className="text-xl">{userData.username}</div>
                    </div>
                  )}
                  <DialogTrigger asChild>
                    {!signIn && (
                      <Button
                        variant="ghost"
                        size="lg"
                        className="text-lg hover:bg-green-3 hover:text-white"
                      >
                        Sign in
                      </Button>
                    )}
                  </DialogTrigger>
                  {signIn && (
                    <Button
                      variant="ghost"
                      size="lg"
                      className="text-lg hover:bg-green-3 hover:text-white"
                      onClick={() => {
                        setSignIn(false);
                        setUserData({});
                        toast.success("Sign Out Successful");
                      }}
                    >
                      Sign out
                    </Button>
                  )}

                  <DialogContent className="min-w-lg">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold">
                        Sign in to your account
                      </DialogTitle>
                      <DialogDescription />
                    </DialogHeader>
                    <div className="flex flex-1 items-center justify-center">
                      <SignInForm
                        onSuccess={() => {
                          setSignIn(true), setSignInDialogOpen(false);
                        }}
                      />
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog
                  open={signUpDialogOpen}
                  onOpenChange={setSignUpDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-2 border-white bg-green-2 ml-2 text-lg hover:bg-green-3 hover:text-white"
                    >
                      Sign up
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="min-w-7xl h-fit">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold">
                        Create New Account
                      </DialogTitle>
                      <DialogDescription />
                    </DialogHeader>
                    <div className="flex items-center space-x-2">
                      <div className="grid flex-1 gap-2">
                        <SignUpForm
                          onSuccess={() => {
                            setSignUpDialogOpen(false);
                          }}
                        />
                      </div>
                    </div>
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
    </div>
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
