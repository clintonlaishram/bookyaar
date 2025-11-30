// /* eslint-disable no-unused-vars */
// import React from "react";
// import { Button } from "../ui/button";
// import {
//   ArrowRight,
//   ArrowUpRight,
//   Menu,
//   X,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";

// function Navbar() {
//   const navigate = useNavigate();
//   const [isOpen, setIsOpen] = React.useState(false);

//   const handleNavigate = (path) => {
//     navigate(path);
//     setIsOpen(false); // close mobile menu after navigation
//   };

//   return (
//     <motion.header
//       initial={{ y: -40, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ type: "spring", stiffness: 120, damping: 18 }}
//       className="w-full h-[4.5rem] sticky top-0 bg-transparent backdrop-blur-lg z-50"
//     >
//       <nav className="px-4 md:px-6 max-width h-full flex items-center justify-between">
//         {/* Logo */}
//         <div
//           className="flex items-center gap-2 cursor-pointer"
//           onClick={() => handleNavigate("/")}
//         >
//           <motion.img
//             src="./logo.png"
//             alt="logo"
//             className="w-10 md:w-12"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             transition={{ type: "spring", stiffness: 260, damping: 18 }}
//           />
//           {/* Uncomment if you want text logo */}
//           {/* <span className="hidden sm:inline-block text-2xl md:text-3xl font-extrabold">
//             BookYaar
//           </span> */}
//         </div>

//         {/* Desktop Links */}
//         <div className="hidden md:flex flex-row gap-8 text-base lg:text-lg">
//           <button
//             onClick={() => handleNavigate("/")}
//             className="hover:text-primary transition-colors"
//           >
//             Home
//           </button>
//           <button
//             onClick={() => handleNavigate("/tutor-register")}
//             className="hover:text-primary transition-colors"
//           >
//             Become a Tutor
//           </button>
//         </div>

//         {/* Desktop Buttons */}
//         <div className="hidden md:flex items-center space-x-4">
//           <motion.div whileHover={{ y: -1, scale: 1.02 }} whileTap={{ scale: 0.96 }}>
//             {/* <Button
//               variant="outline"
//               className="text-sm lg:text-base rounded-full !px-4 lg:!px-5 !py-5"
//               onClick={() => handleNavigate("/demo")}
//             >
//               Request a Demo{" "}
//               <ArrowUpRight className="!w-4 !h-4 ml-1" />
//             </Button> */}
//           </motion.div>
//           <motion.div whileHover={{ y: -1, scale: 1.02 }} whileTap={{ scale: 0.96 }}>
//             <Button
//               className="text-sm lg:text-base rounded-full !px-4 lg:!px-5 !py-5"
//               onClick={() => handleNavigate("/contact")}
//             >
//               Contact Us{" "}
//               <ArrowRight className="!w-4 !h-4 ml-1" />
//             </Button>
//           </motion.div>
//         </div>

//         {/* Mobile Hamburger */}
//         <button
//           className="md:hidden inline-flex items-center justify-center p-2 rounded-full border border-border/60 backdrop-blur-sm"
//           onClick={() => setIsOpen((prev) => !prev)}
//         >
//           {isOpen ? (
//             <X className="w-5 h-5" />
//           ) : (
//             <Menu className="w-5 h-5" />
//           )}
//         </button>
//       </nav>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             key="mobile-menu"
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             transition={{ type: "spring", stiffness: 200, damping: 20 }}
//             className="md:hidden px-4 pt-2 pb-4 bg-background/80 backdrop-blur-xl border-b border-border/60"
//           >
//             <div className="flex flex-col gap-3 text-base">
//               <button
//                 onClick={() => handleNavigate("/")}
//                 className="w-full text-left py-2 hover:text-primary transition-colors"
//               >
//                 Home
//               </button>
//               <button
//                 onClick={() => handleNavigate("/tutor-register")}
//                 className="w-full text-left py-2 hover:text-primary transition-colors"
//               >
//                 Become a Tutor
//               </button>
//             </div>

//             <div className="mt-4 flex flex-col gap-2">
//               {/* <Button
//                 variant="outline"
//                 className="w-full rounded-full justify-between"
//                 onClick={() => handleNavigate("/demo")}
//               >
//                 Request a Demo
//                 <ArrowUpRight className="!w-4 !h-4" />
//               </Button> */}
//               <Button
//                 className="w-full rounded-full justify-between"
//                 onClick={() => handleNavigate("/contact")}
//               >
//                 Contact Us
//                 <ArrowRight className="!w-4 !h-4" />
//               </Button>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.header>
//   );
// }

// export default Navbar;



/* eslint-disable no-unused-vars */
import React from "react";
import { Button } from "../ui/button";
import {
  ArrowRight,
  Menu,
  X,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); // Detect active route
  const [isOpen, setIsOpen] = React.useState(false);

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  // Helper to check if tab is active
  const isActive = (path) => location.pathname === path;

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
      className="w-full h-[4.5rem] md:px-10 sticky top-0 bg-background/40 backdrop-blur-xl z-50"
    >
      <nav className="px-4 md:px-6 max-width h-full flex items-center justify-between">

        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer md:w-40"
          onClick={() => handleNavigate("/")}
        >
          <motion.img
            src="./logo.png"
            alt="logo"
            className="w-10 md:w-12"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
          />
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex flex-row gap-10 text-base lg:text-lg font-medium">
          {[
            { name: "Home", path: "/" },
            { name: "Become a Tutor", path: "/tutor-register" },
          ].map((item) => (
            <div
              key={item.path}
              onClick={() => handleNavigate(item.path)}
              className="relative cursor-pointer group"
            >
              <span
                className={`transition-colors ${
                  isActive(item.path)
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                }`}
              >
                {item.name}
              </span>

              {/* Underline animation */}
              {isActive(item.path) ? (
                <motion.div
                  layoutId="navbar-underline"
                  className="absolute left-0 right-0 -bottom-1 h-[2px] bg-primary rounded-full"
                  transition={{ duration: 0.3 }}
                />
              ) : (
                <div className="absolute left-0 right-0 -bottom-1 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full"></div>
              )}
            </div>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <motion.div whileHover={{ y: -1, scale: 1.03 }} whileTap={{ scale: 0.96 }}>
            <Button
              className="text-sm lg:text-base rounded-full !px-4 lg:!px-5 !py-5"
              onClick={() => handleNavigate("/contact")}
            >
              Contact Us{" "}
              <ArrowRight className="!w-4 !h-4 ml-1" />
            </Button>
          </motion.div>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden inline-flex items-center justify-center p-2 rounded-full border border-border/60 backdrop-blur-sm"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="md:hidden px-4 pt-3 pb-5 bg-background/80 backdrop-blur-xl border-b border-border/60"
          >
            <div className="flex flex-col gap-5 text-base">

              {[
                { name: "Home", path: "/" },
                { name: "Become a Tutor", path: "/tutor-register" },
              ].map((item) => (
                <div
                  key={item.path}
                  className="relative cursor-pointer"
                  onClick={() => handleNavigate(item.path)}
                >
                  <span
                    className={`block py-1 ${
                      isActive(item.path)
                        ? "text-primary"
                        : "text-foreground hover:text-primary"
                    }`}
                  >
                    {item.name}
                  </span>

                  {/* Mobile underline */}
                  {isActive(item.path) && (
                    <motion.div
                      layoutId="mobile-underline"
                      className="w-full h-[2px] bg-primary rounded-full"
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-col gap-3">
              <Button
                className="w-full rounded-full justify-between"
                onClick={() => handleNavigate("/contact")}
              >
                Contact Us
                <ArrowRight className="!w-4 !h-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Navbar;
