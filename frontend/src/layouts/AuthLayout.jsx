const AuthLayout = ({ children }) => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #F5F7FA 0%, #E0F2FE 100%)",
      }}
    >
      {children}
    </div>
  );
};

export default AuthLayout;