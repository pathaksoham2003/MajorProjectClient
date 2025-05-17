import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../services/useAuth";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");
  const isOwner = searchParams.get("seller") === "true";

  const { verifyEmail } = useAuth({ type: isOwner ? "owner" : "user" });

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        toast.error("Invalid verification link");
        return;
      }

      const { success, data, message } = await verifyEmail(token);

      if (success) {
        toast.success(data?.message || "Email verified successfully!");
        navigate("/login");
      } else {
        toast.error(message || "Email verification failed.");
      }
    };

    verify();
  }, [token, isOwner]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <h2 className="text-xl font-semibold text-text">Verifying your email...</h2>
    </div>
  );
};

export default VerifyEmail;
