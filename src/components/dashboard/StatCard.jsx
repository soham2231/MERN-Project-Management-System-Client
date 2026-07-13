import { IconContext } from "react-icons";

const StatCard = ({ title, value, icon: Icon, color }) => {
  return (
    <div className="col-xl-3 col-lg-6 col-md-6 mb-4">
      <div
        className="card border-0 h-100"
        style={{
          background: "linear-gradient(135deg,#1E293B,#0F172A)",
          borderRadius: "18px",
          color: "#fff",
          transition: "0.3s ease",
          cursor: "pointer",
          boxShadow: "0 10px 30px rgba(0,0,0,.35)",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.transform = "translateY(-6px)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.transform = "translateY(0px)")
        }
      >
        <div className="card-body d-flex justify-content-between align-items-center">
          <div>
            <p
              className="mb-2"
              style={{
                color: "#94A3B8",
                fontSize: "14px",
              }}
            >
              {title}
            </p>

            <h2 className="fw-bold">{value}</h2>
          </div>

          <div
            className="rounded-circle d-flex justify-content-center align-items-center"
            style={{
              width: "65px",
              height: "65px",
              background: color,
            }}
          >
            <IconContext.Provider
              value={{
                color: "#fff",
                size: "28px",
              }}
            >
              <Icon />
            </IconContext.Provider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
