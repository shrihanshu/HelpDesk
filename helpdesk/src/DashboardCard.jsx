import React from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const DashboardCard = ({
  title,
  value,
  bgColor = "bg-blue-500 dark:bg-blue-800",
  textColor = "text-white",
  icon: Icon,
  iconBg = "bg-white/30 dark:bg-white/20",
  iconColor = "",
  numberColor = "text-white"
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ type: "spring", stiffness: 120, damping: 15 }}
    whileHover={{ scale: 1.08, boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}
    className="w-44 h-44 flex flex-col items-center justify-between"
  >
    <Card className={`w-full h-full flex flex-col items-center justify-center rounded-xl shadow-md ${bgColor} transition-transform duration-200 cursor-pointer relative overflow-hidden`}>
      {/* Background pattern for visual appeal */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-2 right-2 w-16 h-16 rounded-full bg-white/20"></div>
        <div className="absolute bottom-2 left-2 w-12 h-12 rounded-full bg-white/20"></div>
      </div>
      
      {/* Content container */}
      <div className="flex flex-col items-center justify-center h-full relative z-10">
        {Icon && (
          <div className={`mb-3 flex items-center justify-center rounded-full ${iconBg} w-12 h-12`}>
            <Icon className={`text-2xl ${iconColor}`} />
          </div>
        )}
        <CardTitle className="text-sm font-semibold text-center drop-shadow mb-2 text-white/90">{title}</CardTitle>
        <div className={`text-5xl font-extrabold text-center ${numberColor} drop-shadow-lg tracking-wide leading-none`}>
          {value}
        </div>
      </div>
    </Card>
  </motion.div>
);

export default DashboardCard; 