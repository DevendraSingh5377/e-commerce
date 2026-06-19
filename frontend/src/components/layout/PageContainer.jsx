const PageContainer = ({
  children,
  fluid = false,
}) => {
  return (
    <div
      style={
        fluid
          ? {
              width: "100%",
              height: "100%,"
            }
          : {
              maxWidth: "1300px",
              margin: "0 auto",
              padding: "20px",
            }
      }
    >
      {children}
    </div>
  );
};

export default PageContainer;