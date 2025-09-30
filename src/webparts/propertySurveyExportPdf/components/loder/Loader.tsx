
import * as React from "react";

export default function Loader() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100vw",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // dull background
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999, // high to cover all
      }}
    >
      <div
        style={{
          background: "rgba(0, 0, 0, 0.06)",
          color: "white",
          padding: "20px 30px",
          borderRadius: "8px",
          fontSize: "18px",
          // boxShadow: "0 0 10px rgba(0,0,0,0.3)",
        }}
      >
       טוען, אנא המתן
      </div>
    </div>
  );
}





















// import * as React from "react";

// export default function Loader() {
//   return (
//     <div
//       id="loading"
//       style={{
//         position: "fixed",
//         top: "50%",
//         left: "50%",
//         transform: "translate(-50%, -50%)",
//         background: "rgba(0,0,0,0.7)",
//         color: "white",
//         padding: "20px",
//         borderRadius: "5px",
//         zIndex: 1000,
//       }}
//     >
//       Loading, please wait...
//     </div>
//   );
// }