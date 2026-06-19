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