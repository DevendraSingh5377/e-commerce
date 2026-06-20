require("dotenv").config();

const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

/*
there is asAdmin instead of OnlyAdmdin so use that futher , and remember old words don't replace them if not required.
you may proceed to phase 10 by skiping phase 9 */

/*
Network	Card Number

Visa	4100 2800 0000 1007

Mastercard	5500 6700 0000 1002

RuPay	6527 6589 0000 1005



For all of them:



CVV: Any 3 digits (e.g. 123)

Expiry: Any future date (e.g. 12/30)

OTP: Any random OTP (4–10 digits) on the Razorpay test page will succeed.
*/