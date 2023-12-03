/* eslint-disable react/prop-types */
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";

import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, CabinCount }) {
  // 1.
  const numBookings = bookings.length;
  // 2.
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  // 3.
  const checkins = confirmedStays.length;

  // 4.
  const occupation =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * CabinCount);

  return (
    <>
      <Stat
        title="Bookings"
        icon={<HiOutlineBriefcase />}
        color="blue"
        value={numBookings}
      />
      <Stat
        title="sales"
        icon={<HiOutlineBanknotes />}
        color="green"
        value={formatCurrency(sales)}
      />
      <Stat
        title="check ins"
        icon={<HiOutlineCalendarDays />}
        color="indigo"
        value={checkins}
      />
      <Stat
        title="occupancy rate"
        icon={<HiOutlineChartBar />}
        color="yellow"
        value={Math.round(occupation * 100) + "%"}
      />
    </>
  );
}

export default Stats;
