import React from "react";
import {} from "react-icons/fa";
import { RiShoppingCart2Line } from "react-icons/ri";
import FtasticLogo from "../../assets/ftastic-logo.png";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { AuthModals } from "../AuthModals";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { LogOut, UserIcon, Receipt, ChartPie } from "lucide-react";
import { useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, token, logout } = useAuthStore();
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };
  console.log(location?.pathname);
  return (
    <header
      className={`${
        !location?.pathname?.includes("admin") && "absolute top-0 left-0"
      } w-full py-5 z-50`}
    >
      <div className="__main-container flex justify-between items-center">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={FtasticLogo} className="max-h-12" alt="FtasticLogo" />
          <span className="text-3xl text-[#333333] chewy-regular">
            Fruitastic
          </span>
        </div>
        <nav>
          <ul className="flex gap-8">
            <li>
              <a
                href="/"
                className="text-[#333333] font-semibold hover:text-[#333333]/70 transition-colors duration-300"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/cakes"
                className="text-[#333333] font-semibold hover:text-[#333333]/70 transition-colors duration-300"
              >
                Cakes
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="text-[#333333] font-semibold hover:text-[#333333]/70 transition-colors duration-300"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
        <div className="flex gap-5 items-center">
          <RiShoppingCart2Line
            onClick={() => navigate("/cart-page")}
            className="w-6 h-6 cursor-pointer"
          />
          {token && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={
                        user.profile_picture_url ||
                        `https://ui-avatars.com/api/?name=${user.name}&background=random`
                      }
                      alt={user.name}
                    />
                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>Profil</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/my-orders")}>
                  <Receipt className="mr-2 h-4 w-4" />
                  <span>My Orders</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {user.role === 1 && (
                  <>
                    <DropdownMenuItem
                      onClick={() => navigate("/admin/all-orders")}
                    >
                      <ChartPie className="mr-2 h-4 w-4" />
                      <span>Dashboard Admin</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}
                <DropdownMenuItem
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <AuthModals />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
