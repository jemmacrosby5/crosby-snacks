export default async function CountryPage({ params }) {
    const { id } = await params;
  
    const backendUrl = process.env.BACKEND_URL;
    let scores = [];
  
    if (backendUrl) {
      try {
        scores = await fetch(`${backendUrl}/score/country/${id}`, {
          cache: "no-store",
        }).then((res) => res.json());
      } catch (error) {
        console.error("Error fetching scores:", error);
      }
    } else {
      console.error("BACKEND_URL is not defined");
    }
  
    return (
      <>
        <p>Country Page</p>
        <pre>{JSON.stringify(scores, null, 2)}</pre>
      </>
    );
  }
  