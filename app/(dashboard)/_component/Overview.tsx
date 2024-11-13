"use client";

import { UserSettings } from "@prisma/client";
import { startOfMonth } from "date-fns";
import React, { useState } from "react";

const Overview = ({ userSettings }: { userSettings: UserSettings }) => {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: startOfMonth(new Date()),
    to: new Date(),
  });

  return <div>Overview</div>;
};

export default Overview;
