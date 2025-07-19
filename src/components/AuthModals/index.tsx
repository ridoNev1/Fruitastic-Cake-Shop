import { useState } from "react";
import { RiUserLine } from "react-icons/ri";
import { LoginModal } from "../login-modal";
import { RegisterModal } from "../register-modal";

export function AuthModals() {
  const [activeModal, setActiveModal] = useState<"login" | "register" | null>(
    null
  );

  return (
    <>
      <RiUserLine
        className="w-6 h-6 cursor-pointer"
        onClick={() => setActiveModal("login")}
      />

      <LoginModal
        open={activeModal === "login"}
        onOpenChange={(isOpen) => !isOpen && setActiveModal(null)}
        onSwitchToRegister={() => setActiveModal("register")}
      />
      <RegisterModal
        open={activeModal === "register"}
        onOpenChange={(isOpen) => !isOpen && setActiveModal(null)}
        onSwitchToLogin={() => setActiveModal("login")}
      />
    </>
  );
}
