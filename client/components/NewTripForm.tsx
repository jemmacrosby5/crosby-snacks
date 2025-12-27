export default async function NewTripForm() {
  const backendUrl = process.env.BACKEND_URL;
  let countries
  let users

  const formAction = backendUrl ? `${backendUrl}/trip` : undefined

  if (backendUrl) {
    try {
      countries = await fetch(`${backendUrl}/country/`, {
        cache: "no-store",
      }).then((res) => res.json());
    } catch (error) {
      console.error("Error fetching scores:", error);
    }

    try {
      users = await fetch(`${backendUrl}/user/all`, {
        cache: "no-store",
      }).then((res) => res.json());
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  } else {
    console.error("BACKEND_URL is not defined");
  }

  console.log("Fetched countries:", countries);
  console.log("Fetched users:", users);

  return (
    <div>
      <h2>Create a trip</h2>
      <form action={formAction} method="post">
        <label htmlFor="description" style={{ display: "block", marginBottom: 6 }}>
          Trip Description
        </label>
        <input id="description" name="description" type="text" placeholder="Trip Description (state/city)" />
        <input name="date" type="date" />

        <select name="countryId">
          <option value="">Select Country</option>
          {countries && countries.map((country: any) => (
            <option key={country._id} value={country._id}>
              {country.name}
            </option>
          ))}
        </select>

        <label style={{ display: "block", marginTop: 8, marginBottom: 4 }}>Select people who went (hold Ctrl/Cmd to select multiple)</label>
        <select name="participants" multiple size={Math.min(6, users ? users.length : 6)} style={{ minWidth: 240 }}>
          {users && users.map((u: any) => (
            <option key={u._id || u.id} value={u._id || u.id}>
              {u.username ?? u.name ?? u.email ?? u._id}
            </option>
          ))}
        </select>

        <div style={{ marginTop: 12 }}>
          <button type="submit">Create Trip</button>
        </div>
      </form>
    </div>)}