import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";


const LoginPage = () => {
  const {setUser} = useAuth()
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;

    const formData = new FormData(form);

    const formObject = Object.fromEntries(formData.entries());

    setLoading(true);
    try {
      const res = await api.post("/auth/login", formObject);
      setUser(res.data.user);
      toast.success(res.data.message)
      navigate("/")
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message || "Something went wrong.")
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
           
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="label" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  className="input"
                  placeholder="Email"
                  id="email"
                  name="email"
                  required
                />
              </div>
              <div>
                <label className="label" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                  id="password"
                  name="password"
                  required
                />
              </div>
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-neutral mt-4"
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Please wait...
                  </>
                ) : (
                  <>Login</>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
