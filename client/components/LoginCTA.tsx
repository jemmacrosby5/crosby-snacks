export default function LoginCTA() {
        return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh", padding: 16 }}>
        <div style={{ width: "100%", maxWidth: 560, textAlign: "center", padding: "2rem", borderRadius: 12, boxShadow: "0 8px 30px rgba(2,6,23,0.08)", background: "white" }}>
          <div style={{ fontSize: 56, marginBottom: 8 }}>✈️</div>
          <h2 style={{ margin: "0 0 8px", fontSize: 22 }}>Sign in to submit scores</h2>
          <p style={{ margin: 0, color: "#374151" }}>
            Join other travelers — sign in to add your trip scores, track your trips,
            and appear on the leaderboard.
          </p>

          <div style={{ marginTop: 20 }}>
            <a
              href="/login"
              style={{
                display: "inline-block",
                padding: "10px 18px",
                background: "#111827",
                color: "#fff",
                borderRadius: 8,
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Sign in / Create account
            </a>
          </div>
        </div>
      </div>
    )
}