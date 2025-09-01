import React from "react";

const Health: React.FC = () => {
  return (
    <pre>
      {JSON.stringify(
        {
          status: "ok",
          timestamp: new Date().toISOString(),
        },
        null,
        2
      )}
    </pre>
  );
};

export default Health;
