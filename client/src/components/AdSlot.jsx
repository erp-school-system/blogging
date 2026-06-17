import { useEffect } from "react";

const AdSlot = ({ id, className = "", label = "Advertisement" }) => {
  useEffect(() => {
    try {
      if (window.googletag && window.googletag.cmd) {
        window.googletag.cmd.push(function () {
          window.googletag.display(id);
        });
      }
    } catch (error) {
      console.error("GPT ad error:", error);
    }
  }, [id]);

  return (
    <div className={`ad-slot ${className}`}>
      <span className="ad-label">{label}</span>
      <div id={id} />
    </div>
  );
};

export default AdSlot;
