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
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ type: "spring", stiffness: 120, damping: 15 }}
    whileHover={{ scale: 1.08, boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}
    className="w-44 h-40 flex flex-col items-center justify-between"
  >
    <Card className={`w-full h-full flex flex-col items-center justify-between rounded-xl shadow-md ${bgColor} transition-transform duration-200 cursor-pointer`}>
      {Icon && (
        <div className={`mt-4 mb-2 flex items-center justify-center rounded-full ${iconBg} w-12 h-12`}>
          <Icon className={`text-2xl ${iconColor}`} />
        </div>
      )}
      <CardTitle className="text-md font-semibold text-center drop-shadow mb-1">{title}</CardTitle>
      <div className={`text-4xl font-bold mb-4 text-center w-full truncate ${textColor}`}>{value}</div>
    </Card>
  </motion.div>
);

export default DashboardCard; 